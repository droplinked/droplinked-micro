import React, { useEffect, useRef } from 'react';
import { PaymentElementProps, CommonStyle } from '../droplinked-payment-intent';

type PaymobPaymentProps = Omit<PaymentElementProps, 'type'>;

/**
 * Convert CommonStyle to Paymob's required customStyle
 * @param commonStyle - Common style object
 * @returns customStyle for Paymob
 */
export const convertCommonStyleToPaymobStyle = (commonStyle: CommonStyle): Record<string, any> => {
  return {
    Font_Family: commonStyle.fontFamily ?? 'system-ui, -apple-system, sans-serif',
    Font_Size_Label: (commonStyle.fontSizeLabel ?? '14px').replace('px', ''),
    Font_Size_Input_Fields: (commonStyle.fontSizeInput ?? '16px').replace('px', ''),
    Font_Size_Payment_Button: (commonStyle.fontSizePaymentButton ?? '16px').replace('px', ''),
    Font_Weight_Label: commonStyle.fontWeightLabel ?? 500,
    Font_Weight_Input_Fields: commonStyle.fontWeightInput ?? 400,
    Font_Weight_Payment_Button: commonStyle.fontWeightPaymentButton ?? 600,
    Color_Container: commonStyle.colorContainer ?? '#FFFFFF',
    Color_Border_Input_Fields: commonStyle.colorBorderInput ?? '#E5E7EB',
    Color_Border_Payment_Button: commonStyle.colorBorderPaymentButton ?? 'transparent',
    Radius_Border: (commonStyle.borderRadius ?? '8px').replace('px', ''),
    Color_Disabled: commonStyle.colorDisabled ?? '#9CA3AF',
    Color_Error: commonStyle.colorError ?? '#EF4444',
    Color_Primary: commonStyle.colorPrimary ?? '#4F46E5',
    Color_Input_Fields: commonStyle.colorInput ?? '#FFFFFF',
    Text_Color_For_Label: commonStyle.textColorLabel ?? '#374151',
    Text_Color_For_Payment_Button: commonStyle.textColorPaymentButton ?? '#FFFFFF',
    Text_Color_For_Input_Fields: commonStyle.textColorInput ?? '#1F2937',
    Color_For_Text_Placeholder: commonStyle.placeholderColor ?? '#9CA3AF',
    Width_of_Container: commonStyle.containerWidth ?? '100%',
    Vertical_Padding: (commonStyle.verticalPadding ?? '12px').replace('px', ''),
    Vertical_Spacing_between_components: (commonStyle.verticalSpacing ?? '16px').replace('px', ''),
    Container_Padding: (commonStyle.containerPadding ?? '16px').replace('px', '')
  };
};

/**
 * Paymob Payment Component
 * 
 * This component displays a Paymob payment interface using the Pixel SDK
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


  const publicKey = isTestnet 
    ? 'are_pk_test_87EatMLhbhUCdDjBeSLuGpm5uIyuEmnB'  
    : 'are_pk_live_WkbOfpeYn23KggFR6gIaXAbmjZf0QjKP';  
    
  const paymentMethods = ['card', 'google-pay', 'apple-pay'];
  const disablePay = false;
  const showSaveCard = false;
  const forceSaveCard = false;

  useEffect(() => {
    // Add required stylesheets
    const addStylesheet = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        fetch(href)
          .then(response => response.text())
          .then(cssText => {
            const style = document.createElement('style');
            const scopedCss = cssText.replace(
              /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g, 
              `.paymob-payment-container $1$2`
            );
            style.textContent = scopedCss;
            containerRef.current?.appendChild(style);
          })
          .catch(err => console.error('Error loading stylesheet:', err));
      }
    };

    // Add required script
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
      
  
      await addScript('https://pay.google.com/gp/p/js/pay.js');

     
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

      // Pixel Configuration
      const pixelConfig: any = {
        clientSecret,
        elementId,
        paymentMethods,
        disablePay,
        showSaveCard,
        forceSaveCard,
        publicKey,
     //   returnUrl: return_url,
        
        // Before payment completion function
        beforePaymentComplete: async (paymentMethod: any) => {
          console.log('Before payment completion:', paymentMethod);
          return true;
        },
        
        // After payment completion function
        afterPaymentComplete: async (response: any) => {
          console.log('Payment completed:', response);
          if (onSuccess) {
            onSuccess();
          }
        },
        
        // Payment cancellation function
        onPaymentCancel: () => {
          console.log('Payment cancelled');
          if (onError) {
            onError(new Error('Payment was cancelled'));
          }
        },
        
        // Card validation change function
        cardValidationChanged: (isValid: boolean) => {
          console.log('Card validation:', isValid);
        }
      };

      // Convert commonStyle to customStyle
      if (commonStyle) {
        pixelConfig.customStyle = convertCommonStyleToPaymobStyle(commonStyle);
      }

      // Create new Pixel instance
      try {
        new window.Pixel(pixelConfig);
        pixelInitialized.current = true;
      } catch (error) {
        console.error('Error initializing Paymob Pixel:', error);
        if (onError) {
          onError(error instanceof Error ? error : new Error('Error initializing Paymob payment'));
        }
      }
    };

    initializePixel();

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

 declare global {
   interface Window {
     Pixel: any;
   }
 } 