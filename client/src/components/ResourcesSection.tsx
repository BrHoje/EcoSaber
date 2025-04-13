import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ResourcesSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });
  
  // Separar recursos de documentos e vídeos
  const documentResources = resources?.filter(r => r.type !== "Video") || [];
  const videoResources = resources?.filter(r => r.type === "Video") || [];
  
  // Função para extrair ID do vídeo do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section id="recursos" className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading text-neutral-dark mb-4">Recursos Educacionais</h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            Materiais gratuitos para educadores, estudantes e comunidade sobre desenvolvimento sustentável e educação de qualidade.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-heading text-un-blue">Materiais Didáticos</h3>
            <div className="flex space-x-2">
              <button 
                className={cn("transition-colors", viewMode === 'grid' ? "text-un-blue" : "text-neutral-dark hover:text-un-blue")}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button 
                className={cn("transition-colors", viewMode === 'list' ? "text-un-blue" : "text-neutral-dark hover:text-un-blue")}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
          
          <div className={cn(
            viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6"
          )}>
            {isLoading ? (
              // Skeleton loaders for resources while loading
              Array(3).fill(0).map((_, index) => (
                <div key={index} className={cn(
                  "bg-white rounded-lg shadow-md overflow-hidden",
                  viewMode === 'list' && "flex flex-col md:flex-row"
                )}>
                  <Skeleton className={cn(
                    "w-full h-48 object-cover",
                    viewMode === 'list' && "md:w-1/3 md:h-auto"
                  )} />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full max-w-md mb-2" />
                    <Skeleton className="h-4 w-full max-w-sm mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))
            ) : (
              documentResources.map((resource) => (
                <div key={resource.id} className={cn(
                  "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
                  viewMode === 'list' && "flex flex-col md:flex-row"
                )}>
                  <img 
                    src={resource.imageUrl || "https://placehold.co/600x400?text=No+Image"} 
                    alt={resource.title} 
                    className={cn(
                      "w-full h-48 object-cover",
                      viewMode === 'list' && "md:w-1/3 md:h-auto"
                    )}
                  />
                  <div className="p-6">
                    <span className={cn(
                      "inline-block bg-opacity-20 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2",
                      resource.type === "Guia Prático" ? "bg-eco-green text-eco-green" :
                      resource.type === "Kit de Atividades" ? "bg-action-orange text-action-orange" :
                      "bg-un-blue text-un-blue"
                    )}>
                      {resource.type}
                    </span>
                    <h4 className="text-lg font-semibold font-heading text-neutral-dark mb-2">{resource.title}</h4>
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    <a 
                      href={resource.downloadUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-un-blue font-semibold hover:underline"
                    >
                      {resource.downloadUrl ? (
                        <>Baixar PDF <i className="fas fa-download ml-2"></i></>
                      ) : (
                        <>Visualizar <i className="fas fa-eye ml-2"></i></>
                      )}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {videoResources.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold font-heading text-un-blue mb-6">Vídeos Educativos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoResources.map((video) => {
                const videoId = video.downloadUrl ? getYouTubeVideoId(video.downloadUrl) : null;
                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                
                return (
                  <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {embedUrl ? (
                      <div className="aspect-video">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={embedUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="aspect-video bg-neutral-dark flex items-center justify-center">
                        <img 
                          src={video.imageUrl || "https://placehold.co/600x400?text=No+Video"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-lg font-semibold font-heading text-neutral-dark mb-2">{video.title}</h4>
                      <p className="text-gray-700 mb-4">{video.description}</p>
                      <a 
                        href={video.downloadUrl || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-un-blue font-semibold hover:underline"
                      >
                        Assistir no YouTube <i className="fas fa-external-link-alt ml-2"></i>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
