export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  area?: string;
  description: string;
  context?: string;
  process?: string;
  result?: string;
  antes?: string;
  transformacao?: string;
  resultado?: string;
  coverImage: string;
  gallery: string[];
}

// Importação dinâmica de todos os arquivos info.json das pastas em src/data/projects/*/
const projectJsonModules = (import.meta as any).glob([
  './projects/*/info.json',
  '/src/data/projects/*/info.json',
  './projects/*/info.json.txt',
  '/src/data/projects/*/info.json.txt'
], {
  eager: true,
});

// Importação dinâmica de todas as imagens locais presentes nas pastas de projetos
const projectImageModules = (import.meta as any).glob([
  './projects/*/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  '/src/data/projects/*/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}'
], {
  eager: true,
  import: 'default'
});

export function getProjects(): ProjectItem[] {
  const projectsMap = new Map<string, ProjectItem>();

  // Auxiliar para normalizar caminhos de arquivos e diretórios
  const cleanPath = (p: string): string => {
    return p
      .replace(/^https?:\/\/[^\/]+/, '')
      .replace(/^\/?(src\/data\/)?/, '')
      .replace(/^\.\//, '')
      .toLowerCase();
  };

  for (const path in projectJsonModules) {
    const mod = projectJsonModules[path] as { default?: Record<string, any> } | Record<string, any>;
    let jsonContent: Record<string, any> | null = 'default' in mod ? mod.default : mod;
    
    // Fallback se for string JSON (ex: de arquivo .txt)
    if (typeof jsonContent === 'string') {
      try {
        jsonContent = JSON.parse(jsonContent);
      } catch (e) {
        jsonContent = null;
      }
    }

    if (!jsonContent || !jsonContent.title) continue;

    const dirPath = path.substring(0, path.lastIndexOf('/'));
    const dirClean = cleanPath(dirPath);

    // Função de resolução de imagens estritamente escopada ao diretório do projeto atual
    const resolveImg = (imgRef: string): string => {
      if (!imgRef) return '';
      if (
        imgRef.startsWith('http://') ||
        imgRef.startsWith('https://') ||
        imgRef.startsWith('data:')
      ) {
        return imgRef;
      }
      const filename = imgRef.replace(/^\.\//, '').toLowerCase();
      const targetCleanPath = `${dirClean}/${filename}`;
      
      const matchedKey = Object.keys(projectImageModules).find((key) => {
        const keyClean = cleanPath(key);
        return keyClean.startsWith(dirClean + '/') && (keyClean === targetCleanPath || keyClean.endsWith(`/${filename}`));
      });

      if (matchedKey && projectImageModules[matchedKey]) {
        const mod = projectImageModules[matchedKey];
        return (typeof mod === 'object' && mod && 'default' in mod) ? (mod as any).default : (mod as string);
      }
      return '';
    };

    // Coleta automaticamente TODAS as imagens locais pertencentes a ESTE projeto especificamente
    const folderImageKeys = Object.keys(projectImageModules).filter((key) => {
      const keyClean = cleanPath(key);
      return keyClean.startsWith(dirClean + '/');
    });

    // Ordenação natural das imagens (ex: 1.webp, 2.webp... 8.webp ou por nome)
    folderImageKeys.sort((a, b) => {
      const filenameA = a.substring(a.lastIndexOf('/') + 1);
      const filenameB = b.substring(b.lastIndexOf('/') + 1);
      return filenameA.localeCompare(filenameB, undefined, { numeric: true, sensitivity: 'base' });
    });

    const folderImagesResolved = folderImageKeys.map((key) => {
      const mod = projectImageModules[key];
      return (typeof mod === 'object' && mod && 'default' in mod) ? (mod as any).default : (mod as string);
    });

    // Resolve Capa Oficial de info.json ou pega a primeira imagem da pasta
    let resolvedCover = resolveImg(jsonContent.coverImage);
    if ((!resolvedCover || resolvedCover === jsonContent.coverImage) && folderImagesResolved.length > 0) {
      if (!resolvedCover.startsWith('http') && !resolvedCover.startsWith('data:')) {
        resolvedCover = folderImagesResolved[0];
      }
    }

    // Resolve Galeria Oficial + Importa automaticamente imagens adicionais da pasta
    const declaredGallery = (jsonContent.gallery || []).map(resolveImg).filter(Boolean);
    const combinedGallery: string[] = [];

    // Adiciona imagem de capa se não estiver presente
    if (resolvedCover) {
      combinedGallery.push(resolvedCover);
    }

    // Adiciona imagens declaradas
    for (const img of declaredGallery) {
      if (img && !combinedGallery.includes(img)) {
        combinedGallery.push(img);
      }
    }

    // Importa automaticamente todas as demais imagens encontradas na pasta do projeto
    for (const img of folderImagesResolved) {
      if (img && !combinedGallery.includes(img)) {
        combinedGallery.push(img);
      }
    }

    const ctx = jsonContent.context || jsonContent.antes || '';
    const prc = jsonContent.process || jsonContent.transformacao || jsonContent.processo || '';
    const res = jsonContent.result || jsonContent.resultado || '';
    const projectId = jsonContent.id || dirPath.substring(dirPath.lastIndexOf('/') + 1) || `project-${projectsMap.size + 1}`;

    const projectItem: ProjectItem = {
      id: projectId,
      title: jsonContent.title,
      category: jsonContent.category || 'Arquitetura',
      client: jsonContent.client || 'Privado',
      location: jsonContent.location || 'São Paulo, SP',
      year: jsonContent.year || '2024',
      area: jsonContent.area,
      description: jsonContent.description || jsonContent.summary || '',
      context: ctx,
      process: prc,
      result: res,
      antes: ctx,
      transformacao: prc,
      resultado: res,
      coverImage: resolvedCover || combinedGallery[0] || '',
      gallery: combinedGallery.length > 0 ? combinedGallery : (resolvedCover ? [resolvedCover] : []),
    };

    // Se já existir projeto com mesmo id (ex: pasta duplicada ou alias), preserva o que tiver mais imagens na galeria
    if (projectsMap.has(projectId)) {
      const existing = projectsMap.get(projectId)!;
      if (projectItem.gallery.length > existing.gallery.length || projectItem.description.length > existing.description.length) {
        projectsMap.set(projectId, projectItem);
      }
    } else {
      projectsMap.set(projectId, projectItem);
    }
  }

  return Array.from(projectsMap.values());
}
