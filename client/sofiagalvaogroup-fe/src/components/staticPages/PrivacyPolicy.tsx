import { i18n } from "../../languages/languages";
import Banner from "../shared/Banner";

export default function PrivacyPolicy() {
  const meta_title = i18n.t("privacy.header");
  const meta_description = i18n.t("privacy.meta_description");

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
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              A sua privacidade &eacute; importante para n&oacute;s. &Eacute;
              pol&iacute;tica do Sofia Galvão Group respeitar a sua privacidade
              em rela&ccedil;&atilde;o a qualquer informa&ccedil;&atilde;o sua
              que possamos coletar no site
              <a
                className="text-beige underline"
                href="https://sofiagalvaogroup.com/"
              >
                Sofia Galvão Group
              </a>
              , e outros sites que possu&iacute;mos e operamos.
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Solicitamos informa&ccedil;&otilde;es pessoais apenas quando
              realmente precisamos delas para lhe fornecer um servi&ccedil;o.
              Fazemo-lo por meios justos e legais, com o seu conhecimento e
              consentimento. Tamb&eacute;m informamos por que estamos coletando
              e como ser&aacute; usado.
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Apenas retemos as informa&ccedil;&otilde;es coletadas pelo tempo
              necess&aacute;rio para fornecer o servi&ccedil;o solicitado.
              Quando armazenamos dados, protegemos dentro de meios
              comercialmente aceit&aacute;veis ​​para evitar perdas e roubos,
              bem como acesso, divulga&ccedil;&atilde;o, c&oacute;pia, uso ou
              modifica&ccedil;&atilde;o n&atilde;o autorizados.
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              N&atilde;o compartilhamos informa&ccedil;&otilde;es de
              identifica&ccedil;&atilde;o pessoal publicamente ou com terceiros,
              exceto quando exigido por lei.
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              O nosso site pode ter links para sites externos que n&atilde;o
              s&atilde;o operados por n&oacute;s. Esteja ciente de que
              n&atilde;o temos controle sobre o conte&uacute;do e
              pr&aacute;ticas desses sites e n&atilde;o podemos aceitar
              responsabilidade por suas respectivas&nbsp;
              <a
                className="text-beige underline"
                href="https://politicaprivacidade.com/"
                target="_BLANK"
              >
                pol&iacute;ticas de privacidade
              </a>
              .
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Voc&ecirc; &eacute; livre para recusar a nossa
              solicita&ccedil;&atilde;o de informa&ccedil;&otilde;es pessoais,
              entendendo que talvez n&atilde;o possamos fornecer alguns dos
              servi&ccedil;os desejados.
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              O uso continuado de nosso site ser&aacute; considerado como
              aceita&ccedil;&atilde;o de nossas pr&aacute;ticas em torno de
              <a
                className="text-beige underline"
                href="https://avisodeprivacidad.info/"
                rel="nofollow"
                target="_BLANK"
              >
                Aviso de Privacidad
              </a>
              e informa&ccedil;&otilde;es pessoais. Se voc&ecirc; tiver alguma
              d&uacute;vida sobre como lidamos com dados do usu&aacute;rio e
              informa&ccedil;&otilde;es pessoais, entre em contacto connosco.
            </p>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-black sm:text-4xl mx-auto">
              Pol&iacute;tica de Cookies Sofia Galvão Group
            </h2>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              O que s&atilde;o cookies?
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Como &eacute; pr&aacute;tica comum em quase todos os sites
              profissionais, este site usa cookies, que s&atilde;o pequenos
              arquivos baixados no seu computador, para melhorar sua
              experi&ecirc;ncia. Esta p&aacute;gina descreve quais
              informa&ccedil;&otilde;es eles coletam, como as usamos e por que
              &agrave;s vezes precisamos armazenar esses cookies. Tamb&eacute;m
              compartilharemos como voc&ecirc; pode impedir que esses cookies
              sejam armazenados, no entanto, isso pode fazer o downgrade ou
              'quebrar' certos elementos da funcionalidade do site.
            </p>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              Como usamos os cookies?
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Utilizamos cookies por v&aacute;rios motivos, detalhados abaixo.
              Infelizmente, na maioria dos casos, n&atilde;o existem
              op&ccedil;&otilde;es padr&atilde;o do setor para desativar os
              cookies sem desativar completamente a funcionalidade e os recursos
              que eles adicionam a este site. &Eacute; recomend&aacute;vel que
              voc&ecirc; deixe todos os cookies se n&atilde;o tiver certeza se
              precisa ou n&atilde;o deles, caso sejam usados ​​para fornecer um
              servi&ccedil;o que voc&ecirc; usa.
            </p>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              Desativar cookies
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Voc&ecirc; pode impedir a configura&ccedil;&atilde;o de cookies
              ajustando as configura&ccedil;&otilde;es do seu navegador
              (consulte a Ajuda do navegador para saber como fazer isso). Esteja
              ciente de que a desativa&ccedil;&atilde;o de cookies
              afetar&aacute; a funcionalidade deste e de muitos outros sites que
              voc&ecirc; visita. A desativa&ccedil;&atilde;o de cookies
              geralmente resultar&aacute; na desativa&ccedil;&atilde;o de
              determinadas funcionalidades e recursos deste site. Portanto,
              &eacute; recomend&aacute;vel que voc&ecirc; n&atilde;o desative os
              cookies.
            </p>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              Cookies que definimos
            </h3>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span className="font-bold">
                  Cookies relacionados a Newsletters:{" "}
                </span>
                Este site oferece servi&ccedil;os de assinatura de boletim
                informativo ou e-mail e os cookies podem ser usados ​​para
                lembrar se voc&ecirc; j&aacute; est&aacute; registrado e se deve
                mostrar determinadas notifica&ccedil;&otilde;es v&aacute;lidas
                apenas para usu&aacute;rios inscritos / n&atilde;o inscritos.
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                <span className="font-bold">
                  Cookies relacionados a formul&aacute;rios:{" "}
                </span>
                Quando voc&ecirc; envia dados por meio de um formul&aacute;rio
                como os encontrados nas p&aacute;ginas de contacto ou nos
                formul&aacute;rios de coment&aacute;rios, os cookies podem ser
                configurados para lembrar os detalhes do usu&aacute;rio para
                correspond&ecirc;ncia futura.
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              Cookies de Terceiros
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Em alguns casos especiais, tamb&eacute;m usamos cookies fornecidos
              por terceiros confi&aacute;veis. A se&ccedil;&atilde;o a seguir
              detalha quais cookies de terceiros voc&ecirc; pode encontrar
              atrav&eacute;s deste site.
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                Este site usa o Google Analytics, que &eacute; uma das
                solu&ccedil;&otilde;es de an&aacute;lise mais difundidas e
                confi&aacute;veis ​​da Web, para nos ajudar a entender como
                voc&ecirc; usa o site e como podemos melhorar sua
                experi&ecirc;ncia. Esses cookies podem rastrear itens como
                quanto tempo voc&ecirc; gasta no site e as p&aacute;ginas
                visitadas, para que possamos continuar produzindo
                conte&uacute;do atraente.
              </li>
            </ul>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Para mais informa&ccedil;&otilde;es sobre cookies do Google
              Analytics, consulte a p&aacute;gina oficial do Google Analytics.
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                As an&aacute;lises de terceiros s&atilde;o usadas para rastrear
                e medir o uso deste site, para que possamos continuar produzindo
                conte&uacute;do atrativo. Esses cookies podem rastrear itens
                como o tempo que voc&ecirc; passa no site ou as p&aacute;ginas
                visitadas, o que nos ajuda a entender como podemos melhorar o
                site para voc&ecirc;.
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                Periodicamente, testamos novos recursos e fazemos
                altera&ccedil;&otilde;es subtis na maneira como o site se
                apresenta. Quando ainda estamos testando novos recursos, esses
                cookies podem ser usados ​​para garantir que voc&ecirc; receba
                uma experi&ecirc;ncia consistente enquanto estiver no site,
                enquanto entendemos quais otimiza&ccedil;&otilde;es os nossos
                usu&aacute;rios mais apreciam.
              </li>
            </ul>
            <p></p>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              Compromisso do Usu&aacute;rio
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              O usu&aacute;rio se compromete a fazer uso adequado dos
              conte&uacute;dos e da informa&ccedil;&atilde;o que o Sofia Galvão
              Group oferece no site e com car&aacute;ter enunciativo, mas
              n&atilde;o limitativo:
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                N&atilde;o se envolver em atividades que sejam ilegais ou
                contr&aacute;rias &agrave; boa f&eacute; a &agrave; ordem
                p&uacute;blica;
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                N&atilde;o difundir propaganda ou conte&uacute;do de natureza
                racista, xenof&oacute;bica,
                <a
                  className="text-beige underline"
                  href="https://ondeapostar.com/betano-e-confiavel"
                  rel="nofollow"
                  target="_BLANK"
                >
                  {" "}
                  apostas online
                </a>{" "}
                ou azar, qualquer tipo de pornografia ilegal, de apologia ao
                terrorismo ou contra os direitos humanos;
              </li>
              <li className="pt-4 text-xl text-gray-500 max-w-max">
                N&atilde;o causar danos aos sistemas f&iacute;sicos (hardwares)
                e l&oacute;gicos (softwares) do Sofia Galvão Group, de seus
                fornecedores ou terceiros, para introduzir ou disseminar
                v&iacute;rus inform&aacute;ticos ou quaisquer outros sistemas de
                hardware ou software que sejam capazes de causar danos
                anteriormente mencionados.
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-black sm:text-2xl">
              Mais informa&ccedil;&otilde;es
            </h3>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Esperemos que esteja esclarecido e, como mencionado anteriormente,
              se houver algo que voc&ecirc; n&atilde;o tem certeza se precisa ou
              n&atilde;o, geralmente &eacute; mais seguro deixar os cookies
              ativados, caso interaja com um dos recursos que voc&ecirc; usa em
              nosso site.
            </p>
            <p className="pt-4 text-xl text-gray-500 max-w-max">
              Esta pol&iacute;tica &eacute; efetiva a partir de
              <strong>4 setembro 2022 12:55</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
