import React, { useEffect, useRef } from 'react';
import { PaymentElementProps, CommonStyle } from '../droplinked-payment-intent';

type PaymobPaymentProps = Omit<PaymentElementProps, 'type'>;

/**
 * تبدیل CommonStyle به customStyle مورد نیاز Paymob
 * @param commonStyle - استایل مشترک
 * @returns customStyle برای Paymob
 */
export const convertCommonStyleToPaymobStyle = (commonStyle: CommonStyle): Record<string, any> => {
  return {
    Font_Family: commonStyle.fontFamily,
    Font_Size_Label: commonStyle.fontSizeLabel.replace('px', ''),
    Font_Size_Input_Fields: commonStyle.fontSizeInput.replace('px', ''),
    Font_Size_Payment_Button: commonStyle.fontSizePaymentButton.replace('px', ''),
    Font_Weight_Label: commonStyle.fontWeightLabel,
    Font_Weight_Input_Fields: commonStyle.fontWeightInput,
    Font_Weight_Payment_Button: commonStyle.fontWeightPaymentButton,
    Color_Container: commonStyle.colorContainer,
    Color_Border_Input_Fields: commonStyle.colorBorderInput,
    Color_Border_Payment_Button: commonStyle.colorBorderPaymentButton,
    Radius_Border: commonStyle.borderRadius.replace('px', ''),
    Color_Disabled: commonStyle.colorDisabled,
    Color_Error: commonStyle.colorError,
    Color_Primary: commonStyle.colorPrimary,
    Color_Input_Fields: commonStyle.colorInput,
    Text_Color_For_Label: commonStyle.textColorLabel,
    Text_Color_For_Payment_Button: commonStyle.textColorPaymentButton,
    Text_Color_For_Input_Fields: commonStyle.textColorInput,
    Color_For_Text_Placeholder: commonStyle.placeholderColor,
    Width_of_Container: commonStyle.containerWidth,
    Vertical_Padding: commonStyle.verticalPadding.replace('px', ''),
    Vertical_Spacing_between_components: commonStyle.verticalSpacing.replace('px', ''),
    Container_Padding: commonStyle.containerPadding.replace('px', '')
  };
};

/**
 * کامپوننت پرداخت پی‌ماب
 * 
 * این کامپوننت یک رابط پرداخت پی‌ماب را با استفاده از Pixel SDK نمایش می‌دهد
 */
export const PaymobPayment: React.FC<PaymobPaymentProps> = ({
  clientSecret,
  onSuccess,
  onError,
  return_url,
  commonStyle,
  isTestnet = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementId = 'paymob-elements';
  const pixelInitialized = useRef(false);

  // تعیین public key بر اساس محیط تست یا اصلی
  const publicKey = isTestnet 
    ? 'are_pk_test_87EatMLhbhUCdDjBeSLuGpm5uIyuEmnB'  // کلید تست
    : 'are_pk_live_XXXXX';  // کلید اصلی - باید جایگزین شود
    
  const paymentMethods = ['card', 'google-pay', 'apple-pay'];
  const disablePay = false;
  const showSaveCard = false;
  const forceSaveCard = false;

  useEffect(() => {
    // اضافه کردن استایل‌های مورد نیاز
    const addStylesheet = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // اضافه کردن اسکریپت مورد نیاز
    const addScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const script = document.createElement('script');
          script.src = src;
          script.type = 'module';
          script.onload = () => resolve();
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    const initializePixel = async () => {
      if (pixelInitialized.current) return;
      
      addStylesheet('https://cdn.jsdelivr.net/npm/paymob-pixel@latest/styles.css');
      addStylesheet('https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.css');
      
      await addScript('https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js');
      
      // اضافه کردن اسکریپت Google Pay (اگر لازم است)
      await addScript('https://pay.google.com/gp/p/js/pay.js');

      // منتظر بمانید تا Pixel موجود باشد
      if (typeof window.Pixel === 'undefined') {
        const checkPixel = setInterval(() => {
          if (typeof window.Pixel !== 'undefined') {
            clearInterval(checkPixel);
            initializePayment();
          }
        }, 100);
      } else {
        initializePayment();
      }
    };

    const initializePayment = () => {
      if (!clientSecret || !containerRef.current || pixelInitialized.current) return;

      // پیکربندی Pixel
      const pixelConfig: any = {
        clientSecret,
        elementId,
        paymentMethods,
        disablePay,
        showSaveCard,
        forceSaveCard,
        publicKey,
        returnUrl: return_url,
        
        // تابع قبل از تکمیل پرداخت
        beforePaymentComplete: async (paymentMethod: any) => {
          console.log('قبل از تکمیل پرداخت:', paymentMethod);
          return true;
        },
        
        // تابع بعد از تکمیل پرداخت
        afterPaymentComplete: async (response: any) => {
          console.log('پرداخت کامل شد:', response);
          if (onSuccess) {
            onSuccess();
          }
        },
        
        // تابع لغو پرداخت
        onPaymentCancel: () => {
          console.log('پرداخت لغو شد');
          if (onError) {
            onError(new Error('پرداخت لغو شد'));
          }
        },
        
        // تابع تغییر اعتبارسنجی کارت
        cardValidationChanged: (isValid: boolean) => {
          console.log('اعتبار کارت:', isValid);
        }
      };

      // تبدیل commonStyle به customStyle
      if (commonStyle) {
        pixelConfig.customStyle = convertCommonStyleToPaymobStyle(commonStyle);
      }

      // ایجاد نمونه جدید Pixel
      try {
        new window.Pixel(pixelConfig);
        pixelInitialized.current = true;
      } catch (error) {
        console.error('خطا در راه‌اندازی پیکسل پی‌ماب:', error);
        if (onError) {
          onError(error instanceof Error ? error : new Error('خطا در راه‌اندازی پرداخت پی‌ماب'));
        }
      }
    };

    initializePixel();

    // پاکسازی در هنگام unmount
    return () => {
      pixelInitialized.current = false;
    };
  }, [clientSecret, onSuccess, onError, return_url, commonStyle]);

  return (
    <div className="paymob-payment-container" ref={containerRef}>
      <div id={elementId} style={{ width: '100%' }}></div>
    </div>
  );
};

// اضافه کردن تایپ برای پنجره جهانی
declare global {
  interface Window {
    Pixel: any;
  }
} 