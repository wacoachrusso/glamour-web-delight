export const formatContent = (content: string) => {
  return content
    .split('\n\n')
    .map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('##')) {
        return `<h2 class="text-2xl font-cormorant font-bold mt-8 mb-4 text-primary-foreground/90">${paragraph.replace('##', '').trim()}</h2>`;
      }
      // Handle bullet points
      if (paragraph.includes('- **')) {
        const listItems = paragraph.split('\n').map(item => {
          if (item.includes('- **')) {
            const [title, ...rest] = item.split('**');
            return `<li class="mb-3"><span class="font-bold">${rest[0]}</span>${rest[1].replace('**', '')}</li>`;
          }
          return `<li class="mb-3">${item.replace('- ', '')}</li>`;
        }).join('');
        return `<ul class="list-disc list-inside space-y-2 ml-4 mb-6">${listItems}</ul>`;
      }
      // Regular paragraphs
      return `<p class="mb-6 leading-relaxed text-primary-foreground/80">${paragraph}</p>`;
    })
    .join('');
};