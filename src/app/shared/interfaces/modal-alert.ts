export class ModalAlert {
    title?: string;
    content?: string;
    closeButtonLabel?: string;
  
    constructor(data?: ModalAlert) {
      if (data) {
        this.title = data.title;
        this.content = data.content;
        this.closeButtonLabel = data.closeButtonLabel;
      }
    }
  }