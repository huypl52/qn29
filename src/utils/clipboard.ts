export function copyToClipboard(text: string) {
  // Modern API with fallback
  if (navigator.clipboard && window.isSecureContext) {
    // Navigator clipboard API method
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      textArea.remove();
      return Promise.resolve();
    } catch (error) {
      textArea.remove();
      return Promise.reject(error);
    }
  }
}

export async function readFromClipboard() {
  try {
    // Try modern API first
    if (navigator.clipboard && window.isSecureContext) {
      const text = await navigator.clipboard.readText();
      return text;
    }

    // Fallback to paste event
    const text = await new Promise((resolve, reject) => {
      const textArea = document.createElement('textarea');

      // Position off-screen
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);

      // Handle the paste event
      textArea.addEventListener('paste', (e) => {
        const clipText = e.clipboardData?.getData('text/plain');
        textArea.remove();
        resolve(clipText);
      });

      // Trigger paste
      textArea.focus();
      const result = document.execCommand('paste');

      if (!result) {
        textArea.remove();
        reject(new Error('Paste failed'));
      }
    });

    return text;
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    throw error;
  }
}

export async function getClipboardImage(): Promise<Blob | null> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const items = await navigator.clipboard.read();
      console.log({ items });

      for (const item of items) {
        // Check if the clipboard item contains image data
        if (
          item.types.includes('image/png') ||
          item.types.includes('image/jpeg') ||
          item.types.includes('image/webp')
        ) {
          // Get the image blob
          const blob = await item.getType('image/png');
          return Promise.resolve(blob);
        }
      }
    }

    // Alternative approach using paste event
    // Fallback to paste event
    return new Promise((resolve, reject) => {
      // Create temporary contenteditable div
      const tempDiv = document.createElement('div');
      tempDiv.contentEditable = 'true';
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-99999px';
      tempDiv.style.top = '-99999px';
      document.body.appendChild(tempDiv);

      // Listen for paste event
      tempDiv.addEventListener(
        'paste',
        (e) => {
          const items = e.clipboardData?.items;

          for (const item of items) {
            if (item.type.startsWith('image/')) {
              const blob = item.getAsFile();
              document.body.removeChild(tempDiv);
              resolve(blob);
              return;
            }
          }

          document.body.removeChild(tempDiv);
          reject(new Error('No image found in clipboard'));
        },
        { once: true }
      );

      // Focus and trigger paste
      tempDiv.focus();
      document.execCommand('paste');
    });

    // Prompt user to paste
    // console.log('Please press Ctrl+V/Cmd+V to paste the image');
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    return Promise.reject(error);
    // throw error;
  }
}
