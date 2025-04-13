import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResourcesSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const videos = [
    {
      title: "O que é Educação para o Desenvolvimento Sustentável?",
      description: "Este vídeo explica de forma clara e didática o conceito de Educação para o Desenvolvimento Sustentável e sua importância para a construção de um futuro mais justo e sustentável.",
      duration: "8:45 minutos"
    },
    {
      title: "Série: Histórias de Transformação pela Educação",
      description: "Conheça histórias inspiradoras de comunidades que transformaram sua realidade através da educação de qualidade e de práticas sustentáveis.",
      duration: "12:20 minutos"
    }
  ];

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
              resources?.map((resource) => (
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
                    <Button variant="link" className="inline-flex items-center text-un-blue font-semibold hover:underline p-0">
                      {resource.downloadUrl ? (
                        <>Baixar PDF <i className="fas fa-download ml-2"></i></>
                      ) : (
                        <>Visualizar <i className="fas fa-eye ml-2"></i></>
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold font-heading text-un-blue mb-6">Vídeos Educativos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-neutral-dark flex items-center justify-center">
                  <i className="fas fa-play-circle text-white text-5xl opacity-80"></i>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold font-heading text-neutral-dark mb-2">{video.title}</h4>
                  <p className="text-gray-700 mb-4">{video.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-clock mr-2"></i> {video.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
