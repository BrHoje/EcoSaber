import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertParticipantSchema } from "@shared/schema";
import { z } from "zod";
import { useTranslation } from "react-i18next";

export default function JoinFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // Define the schema with translations
  const formSchema = insertParticipantSchema.extend({
    terms: z.boolean().refine((val) => val === true, {
      message: t('join.termsRequired', "Você precisa concordar com os termos para continuar"),
    }),
  });

  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      interest: "",
      message: "",
      terms: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const { terms, ...participantData } = data;
      await apiRequest("POST", "/api/participants", participantData);
      
      toast({
        title: t('join.success'),
        description: t('join.successMsg'),
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t('join.error'),
        description: t('join.errorMsg'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="participar" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-un-blue to-eco-green">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold font-heading text-white mb-6">{t('join.title')}</h2>
        <p className="text-lg text-white mb-10">
          {t('join.description')}
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('common.fullName')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('common.email')}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('common.phone')}</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('common.city')}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('join.howToContribute')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('common.selectOption')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="volunteer">{t('join.volunteer')}</SelectItem>
                        <SelectItem value="partnership">{t('join.partnership')}</SelectItem>
                        <SelectItem value="donation">{t('join.donation')}</SelectItem>
                        <SelectItem value="ambassador">{t('join.ambassador')}</SelectItem>
                        <SelectItem value="other">{t('join.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.message')}</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t('join.terms')}
                      </FormLabel>
                      <p className="text-neutral-dark text-xs mt-1">
                        {t('join.privacyNote')}
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-un-blue text-white font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('common.sending') : t('common.submit')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
