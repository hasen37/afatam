import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportElementToPdf(
  elementId: string,
  fileName: string,
  onProgress?: (percent: number, statusText: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('تعذر العثور على وثيقة التلخيص لتصديرها كـ PDF');
  }

  onProgress?.(10, 'جاري تحضير الصفحات وتنسيق المحتوى الأكاديمي...');

  // Safe filename
  const safeName = (fileName || 'ملخص_المحاضرة')
    .replace(/[/\\?%*:|"<>]/g, '_')
    .trim();

  // Create or prepare a dedicated visible staging container if the element is currently hidden
  let stagingContainer: HTMLElement | null = null;
  let targetToCapture = element;

  // Check if element is hidden or offscreen
  const rect = element.getBoundingClientRect();
  const isHidden = rect.width === 0 || rect.height === 0 || window.getComputedStyle(element).opacity === '0';

  if (isHidden) {
    onProgress?.(25, 'جاري تهيئة بيئة تصيير المستند عالي الدقة...');
    stagingContainer = document.createElement('div');
    stagingContainer.id = 'pdf-staging-render-box';
    stagingContainer.style.position = 'fixed';
    stagingContainer.style.left = '0';
    stagingContainer.style.top = '0';
    stagingContainer.style.width = '850px';
    stagingContainer.style.backgroundColor = '#ffffff';
    stagingContainer.style.zIndex = '-99999';
    stagingContainer.style.opacity = '1';
    stagingContainer.style.visibility = 'visible';
    stagingContainer.style.pointerEvents = 'none';

    // Clone element
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.display = 'block';
    clone.style.visibility = 'visible';
    clone.style.opacity = '1';
    clone.style.width = '850px';
    clone.style.maxWidth = '850px';
    clone.style.margin = '0 auto';
    clone.style.background = '#ffffff';

    stagingContainer.appendChild(clone);
    document.body.appendChild(stagingContainer);
    targetToCapture = clone;
  }

  try {
    onProgress?.(45, 'جاري رسم وتوليد الصفحات بدقة عالية...');

    // Small delay to ensure any webfonts or layout changes settle
    await new Promise((resolve) => setTimeout(resolve, 150));

    const canvas = await html2canvas(targetToCapture, {
      scale: 2, // High resolution for crisp printing
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 850,
      onclone: (clonedDoc) => {
        // Ensure all print-safe styles are applied
        const clonedEl = clonedDoc.getElementById(targetToCapture.id) || clonedDoc.body;
        if (clonedEl instanceof HTMLElement) {
          clonedEl.style.color = '#0f172a';
        }
      },
    });

    onProgress?.(75, 'جاري تقسيم الصفحات بحسب مقاس A4 القياسي...');

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate height in mm corresponding to canvas width
    const totalPdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

    let heightLeft = totalPdfHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Subsequent pages
    while (heightLeft > 2) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    onProgress?.(95, 'جاري حفظ وتحميل ملف الـ PDF مباشرة...');

    // Trigger instant browser download
    pdf.save(`${safeName}_ملخص.pdf`);

    onProgress?.(100, 'تم تنزيل ملف الـ PDF بنجاح!');
  } catch (err) {
    console.error('HTML2Canvas/jsPDF Error:', err);
    // Fallback: If canvas export had a rendering glitch, trigger native print as foolproof fallback
    window.print();
    throw new Error('تم فتح نافذة الطباعة كبديل مباشر لحفظ الملف كـ PDF فوراً.');
  } finally {
    if (stagingContainer && stagingContainer.parentNode) {
      stagingContainer.parentNode.removeChild(stagingContainer);
    }
  }
}

