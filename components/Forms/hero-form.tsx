import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

// SCHEMA
const formSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(/^\d{2}\s\d{5}\-\d{4}$/),
  email: z.string().min(2).max(50),
});

// FORMAT PHONE NUMBER
const parseAndFormatPhoneNumber = (value: string) => {
  const unformattedValue = value.replace(/\D/g, '');
  const formattedValue = unformattedValue.replace(
    /(\d{2})(\d{5})(\d{4})/,
    '$1 $2-$3',
  );
  return formattedValue;
};

export const HeroForm = ({
  className,
  variant,
  name,
  email,
  phone,
  errorMessage,
  label,
}: {
  className?: string;
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | null | undefined;
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  errorMessage?: boolean;
  label?: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  // Update the `phone` field's value using the `parseAndFormatPhoneNumber` function
  const formattedPhone = form.watch('phone');
  const formattedPhoneValue = formattedPhone
    ? parseAndFormatPhoneNumber(formattedPhone)
    : '';

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const endpoint =
      'https://crm.anapro.com.br/webcrm/webapi/integracao/v2/CadastrarProspect';

    const key = 'wz2O9Z9BawY1';
    const canal_key = '7aTeATm50Tk1';
    const campanha_key = 'T8Ds8DuFA781';
    const key_integradora = '883F81F3-32BF-4A1F-BE1D-71E93E900832';
    const key_agencia = '883F81F3-32BF-4A1F-BE1D-71E93E900832';

    const body = {
      Key: key,
      CanalKey: canal_key,
      CampanhaKey: campanha_key,
      PoliticaPrivacidadeKey: '',
      PessoaNome: values.name,
      PessoaEmail: values.email,
      KeyIntegradora: key_integradora,
      KeyAgencia: key_agencia,
      PessoaTelefones: [
        {
          DDD: values.phone.slice(0, 2),
          Numero: values.phone.slice(2),
        },
      ],
    };

    // ENVIAR DADOS PARA O ANAPRO
    const postData = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    postData();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex gap-y-7 w-full', className)}
      >
        {/* Nome */}
        {name && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-auto">
                {label && <FormLabel>Nome</FormLabel>}
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>

                {errorMessage && <FormMessage />}
              </FormItem>
            )}
          />
        )}

        {/* Número de Contato */}
        {phone && (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full md:w-auto">
                {label && <FormLabel>Número de Contato</FormLabel>}
                <FormControl>
                  <Input
                    placeholder="WhatsApp"
                    {...field}
                    value={formattedPhoneValue}
                    onBlur={() => {
                      form.setValue(
                        'phone',
                        parseAndFormatPhoneNumber(formattedPhoneValue),
                        {
                          shouldValidate: true,
                        },
                      );
                    }}
                    maxLength={11}
                  />
                </FormControl>

                {errorMessage && <FormMessage />}
              </FormItem>
            )}
          />
        )}

        {/* E-mail */}
        {email && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:w-auto">
                {label && <FormLabel>E-mail</FormLabel>}
                <FormControl>
                  <Input placeholder="E-mail" {...field} type="email" />
                </FormControl>
                {errorMessage && <FormMessage />}
              </FormItem>
            )}
          />
        )}

        <Button type="submit" variant={variant} className="self-end">
          Enviar
        </Button>
      </form>
    </Form>
  );
};

HeroForm.defaultProps = {
  name: true,
  email: true,
  phone: true,
  errorMessage: true,
  label: true,
};
