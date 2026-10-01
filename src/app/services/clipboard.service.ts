import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  private readonly _toastMessage = signal<string | null>(null);
  readonly toastMessage = this._toastMessage.asReadonly();

  /**
   * Copies text safely to clipboard with fallback for unsupported browsers
   */
  async copyToClipboard(text: string, label = 'Content'): Promise<boolean> {
    if (!text) {
      this.showToast('Nothing to copy', 'warning');
      return false;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        this.showToast(`${label} copied to clipboard!`, 'success');
        return true;
      } else {
        // Fallback for non-secure or older environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          this.showToast(`${label} copied to clipboard!`, 'success');
          return true;
        } else {
          throw new Error('execCommand returned false');
        }
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      this.showToast('Could not copy to clipboard automatically. Please copy manually.', 'error');
      return false;
    }
  }

  showToast(message: string, type: 'success' | 'warning' | 'error' = 'success', durationMs = 3000): void {
    this._toastMessage.set(message);
    setTimeout(() => {
      if (this._toastMessage() === message) {
        this._toastMessage.set(null);
      }
    }, durationMs);
  }

  clearToast(): void {
    this._toastMessage.set(null);
  }
}
