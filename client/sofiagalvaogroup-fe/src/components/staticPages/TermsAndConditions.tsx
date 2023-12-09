import { i18n } from "../../languages/languages";
import Banner from "../shared/Banner";

export default function TermsAndConditions() {
  const meta_title = i18n.t("terms.header");
  const meta_description = i18n.t("terms.meta_description");

  return (
    <>
      <Banner height="20vh" blurred={true} text={meta_title}></Banner>

      <section className="container mx-auto pt-6 px-8">
        <div className="pt-6 bg-white text-center md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block md:hidden pt-2 text-3xl text-black sm:text-4xl px-4"
            >
              {meta_title}
            </h1>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              <span>1. Termos</span>
            </h2>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                Ao acessar ao site{" "}
                <a
                  className="text-beige underline"
                  href="https://sofiagalvaogroup.com/"
                >
                  Sofia Galvão Group
                </a>
                , concorda em cumprir estes termos de servi&ccedil;o, todas as
                leis e regulamentos aplic&aacute;veis ​​e concorda que &eacute;
                respons&aacute;vel pelo cumprimento de todas as leis locais
                aplic&aacute;veis. Se voc&ecirc; n&atilde;o concordar com algum
                desses termos, est&aacute; proibido de usar ou acessar este
                site. Os materiais contidos neste site s&atilde;o protegidos
                pelas leis de direitos autorais e marcas comerciais
                aplic&aacute;veis.
              </span>
            </p>
          </div>
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              <span>2. Uso de Licen&ccedil;a</span>
            </h2>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                &Eacute; concedida permiss&atilde;o para baixar temporariamente
                uma c&oacute;pia dos materiais (informa&ccedil;&otilde;es ou
                software) no site Sofia Galvão Group , apenas para
                visualiza&ccedil;&atilde;o transit&oacute;ria pessoal e
                n&atilde;o comercial. Esta &eacute; a concess&atilde;o de uma
                licen&ccedil;a, n&atilde;o uma transfer&ecirc;ncia de
                t&iacute;tulo e, sob esta licen&ccedil;a, voc&ecirc; n&atilde;o
                pode:&nbsp;
              </span>
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>Modificar ou copiar os materiais;&nbsp;</span>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>
                  Usar os materiais para qualquer finalidade comercial ou para
                  exibi&ccedil;&atilde;o p&uacute;blica (comercial ou n&atilde;o
                  comercial);&nbsp;
                </span>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>
                  Tentar descompilar ou fazer engenharia reversa de qualquer
                  software contido no site Sofia Galvão Group;&nbsp;
                </span>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>
                  Remover quaisquer direitos autorais ou outras
                  nota&ccedil;&otilde;es de propriedade dos materiais; ou&nbsp;
                </span>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>
                  Transferir os materiais para outra pessoa ou 'espelhe' os
                  materiais em qualquer outro servidor.
                </span>
              </li>
            </ul>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                Esta licen&ccedil;a ser&aacute; automaticamente rescindida se
                voc&ecirc; violar alguma dessas restri&ccedil;&otilde;es e
                poder&aacute; ser rescindida por Sofia Galvão Group a qualquer
                momento. Ao encerrar a visualiza&ccedil;&atilde;o desses
                materiais ou ap&oacute;s o t&eacute;rmino desta licen&ccedil;a,
                voc&ecirc; deve apagar todos os materiais baixados em sua posse,
                seja em formato eletr&oacute;nico ou impresso.
              </span>
            </p>
          </div>
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              <span>3. Isen&ccedil;&atilde;o de responsabilidade</span>
            </h2>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>
                  Os materiais no site da Sofia Galvão Group s&atilde;o
                  fornecidos 'como est&atilde;o'. Sofia Galvão Group n&atilde;o
                  oferece garantias, expressas ou impl&iacute;citas, e, por este
                  meio, isenta e nega todas as outras garantias, incluindo, sem
                  limita&ccedil;&atilde;o, garantias impl&iacute;citas ou
                  condi&ccedil;&otilde;es de comercializa&ccedil;&atilde;o,
                  adequa&ccedil;&atilde;o a um fim espec&iacute;fico ou
                  n&atilde;o viola&ccedil;&atilde;o de propriedade intelectual
                  ou outra viola&ccedil;&atilde;o de direitos.
                </span>
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span>
                  Al&eacute;m disso, o Sofia Galvão Group n&atilde;o garante ou
                  faz qualquer representa&ccedil;&atilde;o relativa &agrave;
                  precis&atilde;o, aos resultados prov&aacute;veis ​​ou &agrave;
                  confiabilidade do uso dos materiais em seu site ou de outra
                  forma relacionado a esses materiais ou em sites vinculados a
                  este site.
                </span>
              </li>
            </ul>
          </div>
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              <span>4. Limita&ccedil;&otilde;es</span>
            </h2>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                Em nenhum caso o Sofia Galvão Group ou seus fornecedores
                ser&atilde;o respons&aacute;veis ​​por quaisquer danos
                (incluindo, sem limita&ccedil;&atilde;o, danos por perda de
                dados ou lucro ou devido a interrup&ccedil;&atilde;o dos
                neg&oacute;cios) decorrentes do uso ou da incapacidade de usar
                os materiais em Sofia Galvão Group, mesmo que Sofia Galvão Group
                ou um representante autorizado da Sofia Galvão Group tenha sido
                notificado oralmente ou por escrito da possibilidade de tais
                danos. Como algumas jurisdi&ccedil;&otilde;es n&atilde;o
                permitem limita&ccedil;&otilde;es em garantias
                impl&iacute;citas, ou limita&ccedil;&otilde;es de
                responsabilidade por danos conseq&uuml;entes ou incidentais,
                essas limita&ccedil;&otilde;es podem n&atilde;o se aplicar a
                voc&ecirc;.
              </span>
            </p>
          </div>
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              <span>5. Precis&atilde;o dos materiais</span>
            </h2>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                Os materiais exibidos no site da Sofia Galvão Group podem
                incluir erros t&eacute;cnicos, tipogr&aacute;ficos ou
                fotogr&aacute;ficos. Sofia Galvão Group n&atilde;o garante que
                qualquer material em seu site seja preciso, completo ou atual.
                Sofia Galvão Group pode fazer altera&ccedil;&otilde;es nos
                materiais contidos em seu site a qualquer momento, sem aviso
                pr&eacute;vio. No entanto, Sofia Galvão Group n&atilde;o se
                compromete a atualizar os materiais.
              </span>
            </p>
          </div>
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              <span>6. Links</span>
            </h2>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                O Sofia Galvão Group n&atilde;o analisou todos os sites
                vinculados ao seu site e n&atilde;o &eacute; respons&aacute;vel
                pelo conte&uacute;do de nenhum site vinculado. A inclus&atilde;o
                de qualquer link n&atilde;o implica endosso por Sofia Galvão
                Group do site. O uso de qualquer site vinculado &eacute; por
                conta e risco do usu&aacute;rio.
              </span>
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">&nbsp;</p>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              <span>Modifica&ccedil;&otilde;es</span>
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                O Sofia Galvão Group pode revisar estes termos de servi&ccedil;o
                do site a qualquer momento, sem aviso pr&eacute;vio. Ao usar
                este site, voc&ecirc; concorda em ficar vinculado &agrave;
                vers&atilde;o atual desses termos de servi&ccedil;o.
              </span>
            </p>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              <span>Lei aplic&aacute;vel</span>
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              <span>
                Estes termos e condi&ccedil;&otilde;es s&atilde;o regidos e
                interpretados de acordo com as leis do Sofia Galvão Group e
                voc&ecirc; se submete irrevogavelmente &agrave;
                jurisdi&ccedil;&atilde;o exclusiva dos tribunais naquele estado
                ou localidade.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
