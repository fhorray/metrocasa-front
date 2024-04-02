import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqQuestions } from '@/constants';

export const FaqSection = () => {
  return (
    <section className="w-full py-24 h-auto px-[15px] bg-white-bg bg-cover bg-no-repeat">
      <div className="w-full max-w-[1216px] mx-auto flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-main-red">
          Perguntas Frequentes
        </h1>
        <p>
          <strong>
            Encontre respostas seguras para suas principais dúvidas a seguir.
          </strong>
          Estamos aqui para tornar sua busca por informações mais fácil e
          esclarecedora.
        </p>

        {/* ACCORDIONS */}
        <Accordion type="single" collapsible>
          {faqQuestions.map((question) => (
            <AccordionItem value={question.question}>
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>{question.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
