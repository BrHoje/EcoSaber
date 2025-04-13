import { useQuery } from "@tanstack/react-query";
import { Stat, Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export default function ImpactSection() {
  const { data: impactStats, isLoading: isLoadingStats } = useQuery<Stat[]>({
    queryKey: ["/api/stats?category=impact"],
  });

  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const impactMetrics = [
    {
      title: "Melhoria na Conscientização Ambiental",
      before: 35,
      after: 85
    },
    {
      title: "Engajamento Comunitário em Iniciativas Sustentáveis",
      before: 22,
      after: 68
    }
  ];

  return (
    <section id="impacto" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading text-neutral-dark mb-4">Nosso Impacto</h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            Confira os resultados que estamos alcançando e o impacto que nossas ações estão gerando na comunidade.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold font-heading text-un-blue mb-8 text-center">Indicadores de Desempenho</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingStats ? (
              // Skeleton loaders for stats while loading
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-neutral-light rounded-lg p-6 shadow-md text-center">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-9 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              ))
            ) : (
              impactStats?.map((stat, index) => (
                <div key={stat.id} className="bg-neutral-light rounded-lg p-6 shadow-md text-center">
                  <div className={cn(
                    "inline-flex items-center justify-center h-16 w-16 rounded-full text-2xl mb-4 bg-opacity-20",
                    index % 3 === 0 ? "bg-un-blue text-un-blue" :
                    index % 3 === 1 ? "bg-eco-green text-eco-green" :
                    "bg-action-orange text-action-orange"
                  )}>
                    <i className={`fas fa-${stat.icon}`}></i>
                  </div>
                  <div className={cn(
                    "text-4xl font-bold mb-2",
                    index % 3 === 0 ? "text-un-blue" :
                    index % 3 === 1 ? "text-eco-green" :
                    "text-action-orange"
                  )}>{stat.value}</div>
                  <div className="text-neutral-dark font-medium">{stat.label}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-heading text-un-blue mb-8 text-center">Métricas de Impacto</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="bg-neutral-light rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold font-heading text-neutral-dark mb-4">{metric.title}</h4>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Antes da Intervenção</span>
                    <span className="text-sm font-medium text-gray-700">{metric.before}%</span>
                  </div>
                  <Progress value={metric.before} className="h-2 bg-gray-200">
                    <div className="bg-neutral-dark h-2 rounded-full" style={{ width: `${metric.before}%` }}></div>
                  </Progress>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Após a Intervenção</span>
                    <span className="text-sm font-medium text-gray-700">{metric.after}%</span>
                  </div>
                  <Progress value={metric.after} className="h-2 bg-gray-200">
                    <div className="bg-un-blue h-2 rounded-full" style={{ width: `${metric.after}%` }}></div>
                  </Progress>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold font-heading text-un-blue mb-8 text-center">Depoimentos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoadingTestimonials ? (
              // Skeleton loaders for testimonials while loading
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-neutral-light rounded-lg p-6 shadow-md">
                  <div className="flex items-start mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="ml-4">
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
            ) : (
              testimonials?.map((testimonial) => (
                <div key={testimonial.id} className="bg-neutral-light rounded-lg p-6 shadow-md">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-12 w-12 rounded-full" 
                        src={testimonial.imageUrl || "https://randomuser.me/api/portraits/lego/0.jpg"} 
                        alt={`Foto de ${testimonial.name}`} 
                      />
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg font-semibold font-heading text-neutral-dark">{testimonial.name}</h5>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{`"${testimonial.text}"`}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
