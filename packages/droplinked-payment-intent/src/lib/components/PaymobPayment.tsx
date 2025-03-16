import React, { useEffect, useRef } from 'react';
import { PaymentElementProps } from '../droplinked-payment-intent';

type PaymobPaymentProps = Omit<PaymentElementProps, 'type' | 'theme'> & {
  /**
   * تنظیمات ظاهری کامپوننت
   */
  appearance?: any;
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
  submitButtonProps,
  appearance,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementId = 'paymob-elements';
  const pixelInitialized = useRef(false);

  // مقادیر پیش‌فرض
  const publicKey = 'are_pk_test_87EatMLhbhUCdDjBeSLuGpm5uIyuEmnB';
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

      // تبدیل appearance به customStyle
      if (appearance) {
        const convertedCustomStyle = convertAppearanceToCustomStyle(appearance);
        pixelConfig.customStyle = convertedCustomStyle;
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

      // رویداد پرداخت از خارج (اگر دکمه پرداخت خارجی وجود داشته باشد)
      const handlePayFromOutside = () => {
        const event = new Event('payFromOutside');
        window.dispatchEvent(event);
      };

      // اضافه کردن دکمه پرداخت از خارج اگر درخواست شده باشد
      if (submitButtonProps?.onClick) {
        const originalOnClick = submitButtonProps.onClick;
        submitButtonProps.onClick = (e) => {
          originalOnClick(e);
          handlePayFromOutside();
        };
      }
    };

    // تابع تبدیل appearance به customStyle
    const convertAppearanceToCustomStyle = (appearance: any): Record<string, any> => {
      const customStyle: Record<string, any> = {
        Font_Family: 'Gotham',
        Font_Size_Label: '16',
        Font_Size_Input_Fields: '16',
        Font_Size_Payment_Button: '14',
        Font_Weight_Label: 400,
        Font_Weight_Input_Fields: 200,
        Font_Weight_Payment_Button: 600,
        Color_Container: '#FFF',
        Color_Border_Input_Fields: '#D0D5DD',
        Color_Border_Payment_Button: '#A1B8FF',
        Radius_Border: '8',
        Color_Disabled: '#A1B8FF',
        Color_Error: '#CC1142',
        Color_Primary: '#144DFF',
        Color_Input_Fields: '#FFF',
        Text_Color_For_Label: '#000',
        Text_Color_For_Payment_Button: '#FFF',
        Text_Color_For_Input_Fields: '#000',
        Color_For_Text_Placeholder: '#667085',
        Width_of_Container: '100%',
        Vertical_Padding: '40',
        Vertical_Spacing_between_components: '18',
        Container_Padding: '0'
      };

      // اعمال تنظیمات از appearance
      if (appearance.variables) {
        const vars = appearance.variables;
        
        if (vars.colorBackground) customStyle.Color_Container = vars.colorBackground;
        if (vars.colorText) {
          customStyle.Text_Color_For_Label = vars.colorText;
          customStyle.Text_Color_For_Input_Fields = vars.colorText;
        }
        if (vars.borderRadius) customStyle.Radius_Border = vars.borderRadius.replace('px', '');
        if (vars.colorSuccess) customStyle.Color_Primary = vars.colorSuccess;
        if (vars.colorDanger) customStyle.Color_Error = vars.colorDanger;
      }

      // اعمال قوانین سفارشی
      if (appearance.rules) {
        // پیاده‌سازی منطق تبدیل قوانین سفارشی
        // این بخش می‌تواند پیچیده باشد و به نیازهای خاص بستگی دارد
      }

      return customStyle;
    };

    initializePixel();

    // پاکسازی در هنگام unmount
    return () => {
      pixelInitialized.current = false;
    };
  }, [clientSecret, onSuccess, onError, appearance, submitButtonProps]);

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