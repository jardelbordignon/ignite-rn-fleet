[Documento sobre o OAuth 2.0](https://efficient-sloth-d85.notion.site/OAuth-2-0-1b447112feef4c6296ae36345b3dc667)

[Digitalocean introdução ao OAuth 2.0](https://www.digitalocean.com/community/tutorials/uma-introducao-ao-oauth-2-pt)

**Aqui está uma visão geral de como o OAuth 2.0 funciona:**

1. Registro do Aplicativo: Antes de começar, o desenvolvedor do aplicativo deve registrar o aplicativo no provedor de serviços (como uma rede social, serviço de e-mail, etc.). Isso geralmente envolve a geração de um ID de cliente e uma chave secreta (chamada de segredo do cliente).

2. Pedido de Autorização: Quando um usuário tenta acessar um recurso protegido (como sua conta em um serviço da web) por meio de um aplicativo de terceiros, o aplicativo redireciona o usuário para o provedor de serviços, solicitando autorização. Isso é feito por meio de um pedido de autorização que inclui o ID de cliente do aplicativo, escopo (quais recursos estão sendo solicitados) e informações de redirecionamento.

3. Concessão de Autorização: O provedor de serviços verifica a identidade do usuário e, se o usuário conceder autorização, o provedor emite um token de autorização (geralmente chamado de código de autorização) e redireciona o usuário de volta para o aplicativo de terceiros por meio de um URI de redirecionamento.

4. Troca do Código de Autorização por um Token de Acesso: O aplicativo de terceiros recebe o código de autorização e, em seguida, troca esse código por um token de acesso. Isso é feito enviando uma solicitação para o provedor de serviços, que inclui o código de autorização e o segredo do cliente. O provedor de serviços valida o código e, se tudo estiver correto, emite um token de acesso.

5. Acesso aos Recursos Protegidos: Com o token de acesso, o aplicativo de terceiros pode acessar os recursos protegidos em nome do usuário, usando o token para autenticação. O token de acesso geralmente tem um tempo de vida limitado e, quando expira, o aplicativo precisa solicitar um novo token.

<br/>

## Criando projeto no Google Cloud Platform (GCP)

1. Acesse [Google Cloud Platform](https://cloud.google.com/?hl=pt-BR), faça login se necessário e entre no console
2. Dentro do console acesse [Novo projeto](https://console.cloud.google.com/projectcreate), edite o nome, o restante pode deixar como aparecer e clique em Criar, após o processo clique em SELECIONAR PROJETO
3. Agora dentro do projeto clique em Menu de Navegação > APIs e seviços > [Tela de permissão OAuth](https://console.cloud.google.com/apis/credentials/consent), selecione Externo e clique em Criar
4. Insira as informações Nome do app, E-mail para suporte do usuário e email do desenvolvedor. Clique em SALVAR E CONTINUAR
5. Clique em ADICIONAR OU REMOVER ESCOPOS, selecione os dois primeiros itens e clique em ATUALIZAR
6. Nas demais etapas é só avançar e clicar em PUBLICAR APLICATIVO

## Criando as credenciais

1. Clique em Menu de Navegação > APIs e seviços > Credenciais > + CRIAR CREDENCIAIS > [ID do cliente OAuth](https://console.cloud.google.com/apis/credentials/oauthclient)
2. Selecione android, insira nome do projeto e nome do pacote (ex.: dev.bordignon.ignitefleet)
3. npx expo prebuild -> será solicitado o nome do pacote, informe exatamente o mesmo definido anteriormente para ambos os projetos (android e ios)
4. yarn android - para gerar a build
5. yarn android:signin - para gerar as chaves
6. copie o sha1 da config de debug exibida no terminal e cole no input na dashboard do google cloud, clique em Criar, copie o 'ID do cliente' gerado e cole no .env
7. faça o processo semelhante para o ios, é mais simples que o do android.
