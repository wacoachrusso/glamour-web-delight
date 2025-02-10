export const formatContent = (content: string) => {
  return content
    .split('\n\n')
    .map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('##')) {
        return `<h2 class="text-3xl font-cormorant font-bold mt-12 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light leading-tight">${paragraph.replace('##', '').trim()}</h2>`;
      }
      if (paragraph.startsWith('#')) {
        return `<h1 class="text-4xl font-cormorant font-bold mt-12 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary leading-tight">${paragraph.replace('#', '').trim()}</h1>`;
      }
      
      // Handle bullet points
      if (paragraph.includes('- ')) {
        const listItems = paragraph.split('\n').map(item => {
          if (item.includes('- **')) {
            const [_, ...titleAndRest] = item.split('**');
            const [title, ...rest] = titleAndRest;
            return `<li class="mb-4"><span class="font-bold text-secondary">${title}</span>${rest.join('').replace('**', '')}</li>`;
          }
          return `<li class="mb-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors">${item.replace('- ', '')}</li>`;
        }).join('');
        return `<ul class="list-disc list-inside space-y-2 my-6 ml-4 marker:text-secondary">${listItems}</ul>`;
      }

      // Handle blockquotes
      if (paragraph.startsWith('>')) {
        return `<blockquote class="border-l-4 border-secondary pl-4 italic my-6 text-primary-foreground/70 bg-secondary/5 p-4 rounded-r">${paragraph.replace('>', '').trim()}</blockquote>`;
      }

      // Regular paragraphs with hover effect
      return `<p class="mb-6 leading-relaxed text-primary-foreground/80 text-lg hover:text-primary-foreground transition-colors">${paragraph}</p>`;
    })
    .join('');
};