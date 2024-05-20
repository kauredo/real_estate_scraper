import { useEffect, useState } from "react";
import {
  find_all_backoffice_newsletter_subscriptions,
  find_all_backoffice_variables,
} from "../../../utils/getters";
import VariableForm from "./VariableForm";
import ListingForm from "./ListingForm";

interface User {
  id: number;
  email: string;
}

interface Subscription {
  id: number;
  name: string;
  user: User;
}

interface Variable {
  id: number;
  name: string;
  value: string;
  icon: string;
}

export default function BackofficeHome() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tempVariables = await find_all_backoffice_variables();
      const tempSubscriptions =
        await find_all_backoffice_newsletter_subscriptions();

      return { tempVariables, tempSubscriptions };
    };

    fetchData().then(data => {
      setVariables(data.tempVariables);
      setSubscriptions(data.tempSubscriptions);
    });
  }, []);

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      {/* {# Variáveis } */}
      <div className="w-full sm:w-1/2 shadow-md rounded px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Variáveis
        </h2>
        <p className="text-gray-500 pt-3 max-w-none">
          Nota: copiar ícones do site{" "}
          <a
            className="text-beige underline"
            href="https://fontawesome.com/v5/search?m=free"
            target="_blank"
          >
            fontawesome.com/v5
          </a>
          , por exemplo: "fas fa-home"
        </p>
        {variables.length > 0 &&
          variables.map(variable => {
            if (!variable.name || !variable.value || !variable.icon) return;

            return (
              <VariableForm
                key={variable.id}
                variable={variable}
                variables={variables}
                setVariables={setVariables}
              />
            );
          })}

        <div className="my-6">
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <VariableForm
              variable={null}
              variables={variables}
              setVariables={setVariables}
            />
          </div>
        </div>
      </div>
      {/* {# Colleagues } */}
      <div className="w-full sm:w-1/2 shadow-md rounded px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Links de Imóveis
        </h2>
        <p className="text-gray-500 pt-3 max-w-none">
          Nota: este campo pode ser usado para adicionar imóveis de colegas, ou
          para ir buscar a informação mais recente de qualquer imóvel já na
          plataforma (tanto em Português como em Inglês).
        </p>
        <div className="my-6">
          <ListingForm />
        </div>
      </div>
      {/* {# Newsletter Subs } */}
      <div className="w-full sm:w-1/2 shadow-md rounded px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Subscrições à Newsletter
        </h2>
        <div className="my-6 field mb-4 flex flex-col flex-wrap sm:flex-row items-center gap-4">
          <ul className="list-disc" style={{ listStylePosition: "inside" }}>
            {subscriptions.length > 0 &&
              subscriptions?.map(sub => {
                return (
                  <li key={sub.id}>
                    <span>{sub.name}</span>, <span>{sub.user.email}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
