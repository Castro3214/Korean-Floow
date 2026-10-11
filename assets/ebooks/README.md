# Central de Ebooks e Bônus — Korean Flow

Esta pasta foi reservada para armazenar os arquivos PDF dos materiais complementares do **Método Korean Flow**.

## Arquivos Esperados

1. **Guia de Refeições**:
   - Arquivo: `guia-refeicoes.pdf`
   - Caminho: `assets/ebooks/guia-refeicoes.pdf`
   - Foco: Alimentação consciente, organização, praticidade e rotina equilibrada com bem-estar e consistência.

2. **Korean Lifestyle**:
   - Arquivo: `korean-lifestyle.pdf`
   - Caminho: `assets/ebooks/korean-lifestyle.pdf`
   - Foco: Rituais matinais/noturnos, mentalidade, estética de autocuidado e hábitos de bem-estar inspirados na cultura coreana.

## Como disponibilizar um ebook

Quando os arquivos PDF estiverem finalizados:
1. Copie o arquivo `.pdf` para esta pasta (`assets/ebooks/`).
2. No arquivo `src/data/bonusData.js`, atualize a propriedade `status` do material de `'coming_soon'` para `'available'`.
3. O leitor integrado do Korean Flow detectará o arquivo e o exibirá imediatamente no modal in-app e permitirá download/abertura externa.
