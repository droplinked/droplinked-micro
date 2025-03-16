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
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
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
        returnUrl: return_url,
        
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