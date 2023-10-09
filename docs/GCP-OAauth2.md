https://efficient-sloth-d85.notion.site/OAuth-2-0-1b447112feef4c6296ae36345b3dc667

# Criando projeto google cloud

1. Acesse [Google Cloud](https://cloud.google.com/?hl=pt-BR), faça login se necessário e entre no console
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
