/* eslint-disable @typescript-eslint/no-explicit-any */
interface ModalInterface {
  waiting(message: string): any;
  success(message: string): any;
  error(message: string): any;
  close(): any;
}

class defaultModal implements ModalInterface {
  waiting(message: string) {
    console.log(`Waiting: ${message}`);
  }

  success(message: string) {
    console.log(`Success: ${message}`);
  }

  error(message: string) {
    console.log(`Error: ${message}`);
  }

  close() {
    console.log('Close');
  }
}

export { ModalInterface, defaultModal };
