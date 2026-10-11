/**
 * CONTEÚDO INTEGRAL DOS EBOOKS E GUIAS — KOREAN FLOW
 * Transcrição fiel, diagramada e otimizada para leitura digital in-app
 */

export const EBOOKS_CONTENT = {
  'guia-refeicoes': {
    id: 'guia-refeicoes',
    title: 'Guia Xô Barriguinha',
    subtitle: 'Comida simples. Rotina leve.',
    tagline: '21 Dias de Praticidade, Equilíbrio e Bem-Estar',
    koreanSubtitle: '가벼운 몸 · 식사 가이드',
    coverImage: 'assets/ebooks/cover-xo-barriguinha.jpg',
    pdfFile: 'assets/ebooks/guia-xo-barriguinha.pdf',
    totalPages: 15,
    chapters: [
      {
        id: 'sobre',
        number: 1,
        title: 'Sobre este guia',
        html: `
          <div class="kf-ebook-chapter">
            <h3>Para quem é este material</h3>
            <p>Este guia foi feito para quem quer comer melhor e perder peso de forma saudável, mas sente que dietas "da moda" são caras, complicadas ou incompatíveis com a realidade do orçamento familiar brasileiro.</p>
            <p>Não é necessário nenhum conhecimento prévio sobre nutrição para usar este material. Todas as explicações foram pensadas para quem está começando.</p>
            
            <div class="kf-ebook-callout kf-callout-success">
              <h4>O que este guia promete</h4>
              <ul>
                <li>Ensinar o princípio básico por trás da perda de peso saudável, sem modismos.</li>
                <li>Mostrar como montar pratos equilibrados usando alimentos fáceis de encontrar em qualquer mercado, feira ou sacolão do Brasil.</li>
                <li>Entregar um cardápio de 7 dias pronto para usar como ponto de partida.</li>
                <li>Fornecer 12 receitas testadas, com ingredientes acessíveis e custo estimado por porção.</li>
                <li>Ensinar a organizar a marmita da semana para economizar tempo e dinheiro.</li>
              </ul>
            </div>

            <div class="kf-ebook-callout kf-callout-alert">
              <h4>O que este guia NÃO promete</h4>
              <p>Este material não promete perda de peso garantida em um prazo específico, não substitui o acompanhamento de um nutricionista ou médico, e não deve ser usado como tratamento para nenhuma condição de saúde. Pessoas com restrições alimentares, doenças crônicas, gestantes ou lactantes devem buscar orientação profissional individualizada antes de adotar mudanças alimentares.</p>
            </div>

            <div class="kf-ebook-quote">
              “O objetivo aqui não é uma dieta perfeita por 30 dias. É um jeito de comer melhor que você consiga manter pelo resto da vida, gastando o que já gasta — ou menos.”
            </div>
          </div>
        `
      },
      {
        id: 'fundamentos',
        number: 2,
        title: 'Fundamentos: como o corpo emagrece de verdade',
        html: `
          <div class="kf-ebook-chapter">
            <h3>O princípio central</h3>
            <p>De forma simplificada, o corpo perde peso quando gasta mais energia do que recebe pela alimentação ao longo do tempo — o chamado <strong>déficit calórico</strong>. Isso pode ser alcançado comendo um pouco menos, escolhendo alimentos mais nutritivos e menos calóricos por porção, e movimentando mais o corpo no dia a dia.</p>
            <p>Não existe alimento "mágico" que emagrece sozinho, assim como não existe alimento "proibido" que engorda sozinho fora de contexto. O que importa é o padrão alimentar ao longo das semanas, não uma refeição isolada.</p>

            <h3>Os quatro pilares de um prato equilibrado</h3>
            <div class="kf-ebook-grid-2">
              <div class="kf-ebook-card-pillar">
                <span class="kf-pillar-icon">🍳</span>
                <strong>Proteínas</strong>
                <p>Ajudam na saciedade e na manutenção muscular (ovos, frango, carnes, feijão, lentilha, grão-de-bico, sardinha).</p>
              </div>
              <div class="kf-ebook-card-pillar">
                <span class="kf-pillar-icon">🍠</span>
                <strong>Carboidratos complexos</strong>
                <p>Fornecem energia de forma mais estável (arroz, batata-doce, mandioca, aveia, milho).</p>
              </div>
              <div class="kf-ebook-card-pillar">
                <span class="kf-pillar-icon">🥗</span>
                <strong>Vegetais e legumes</strong>
                <p>Trazem fibras, vitaminas e volume ao prato com poucas calorias.</p>
              </div>
              <div class="kf-ebook-card-pillar">
                <span class="kf-pillar-icon">🥑</span>
                <strong>Gorduras boas, com moderação</strong>
                <p>Azeite, abacate, ovos, oleaginosas para absorção de vitaminas.</p>
              </div>
            </div>

            <p style="margin-top: 14px;">Beber água suficiente ao longo do dia e dormir bem também influenciam diretamente o apetite e os resultados — são tão importantes quanto o prato em si.</p>

            <div class="kf-ebook-quote">
              “Se você tiver que lembrar de uma frase deste capítulo, que seja esta: consistência simples vence perfeição pontual.”
            </div>
          </div>
        `
      },
      {
        id: 'prato-ideal',
        number: 3,
        title: 'O método do prato ideal',
        html: `
          <div class="kf-ebook-chapter">
            <p>Uma forma simples de montar qualquer refeição principal, sem precisar pesar ou contar calorias:</p>

            <div class="kf-plate-visual">
              <div class="kf-plate-half">
                <span class="kf-plate-label">50% do Prato</span>
                <strong>Vegetais e Legumes</strong>
                <p>Alface, couve, repolho, cenoura, abobrinha, chuchu, tomate</p>
              </div>
              <div class="kf-plate-quarter kf-plate-protein">
                <span class="kf-plate-label">25%</span>
                <strong>Proteína</strong>
                <p>Ovo, frango, carne moída, feijão, lentilha, sardinha</p>
              </div>
              <div class="kf-plate-quarter kf-plate-carb">
                <span class="kf-plate-label">25%</span>
                <strong>Carboidrato</strong>
                <p>Arroz, batata, batata-doce, mandioca, milho</p>
              </div>
            </div>

            <div class="kf-ebook-table-responsive">
              <table class="kf-ebook-table">
                <thead>
                  <tr>
                    <th>Parte do prato</th>
                    <th>Proporção</th>
                    <th>Exemplos acessíveis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Vegetais e legumes</strong></td>
                    <td>Metade do prato (50%)</td>
                    <td>Alface, couve, repolho, cenoura, abobrinha, chuchu, tomate</td>
                  </tr>
                  <tr>
                    <td><strong>Proteína</strong></td>
                    <td>Um quarto do prato (25%)</td>
                    <td>Ovo, frango, carne moída, feijão, lentilha, sardinha</td>
                  </tr>
                  <tr>
                    <td><strong>Carboidrato</strong></td>
                    <td>Um quarto do prato (25%)</td>
                    <td>Arroz, batata, batata-doce, mandioca, milho</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style="margin-top: 14px;">Essa proporção funciona tanto no almoço quanto no jantar. No café da manhã e nos lanches, o foco muda um pouco: priorize proteína e fibras (ovos, aveia, frutas) para chegar com menos fome na próxima refeição.</p>
          </div>
        `
      },
      {
        id: 'lista-compras',
        number: 4,
        title: 'Lista de compras inteligente',
        html: `
          <div class="kf-ebook-chapter">
            <p>Alimentos baratos não são sinônimo de comida ruim. Muitos dos itens mais nutritivos do Brasil também estão entre os mais acessíveis, especialmente quando comprados na estação certa e nas feiras livres.</p>

            <div class="kf-ebook-table-responsive">
              <table class="kf-ebook-table">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Alimentos acessíveis</th>
                    <th>Dica de economia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Proteínas</strong></td>
                    <td>Ovos, frango (coxa/sobrecoxa), sardinha e atum em lata, feijão, lentilha, grão-de-bico, carne moída de segunda</td>
                    <td>Compre o frango inteiro e corte em casa — sai mais barato que as peças já cortadas.</td>
                  </tr>
                  <tr>
                    <td><strong>Carboidratos</strong></td>
                    <td>Arroz, batata, batata-doce, mandioca/aipim, aveia, macarrão, milho</td>
                    <td>Compre grãos a granel e em maior quantidade quando o preço estiver bom.</td>
                  </tr>
                  <tr>
                    <td><strong>Vegetais e legumes</strong></td>
                    <td>Couve, repolho, cenoura, abobrinha, chuchu, tomate, cebola, alface</td>
                    <td>Vá à feira perto do horário de fechamento — os preços costumam cair.</td>
                  </tr>
                  <tr>
                    <td><strong>Frutas</strong></td>
                    <td>Banana, mamão, laranja, maçã, melancia (conforme a estação)</td>
                    <td>Prefira sempre a fruta da época — é mais barata e mais saborosa.</td>
                  </tr>
                  <tr>
                    <td><strong>Gorduras boas</strong></td>
                    <td>Óleo, azeite (quando possível), ovo, abacate na época</td>
                    <td>Use o óleo comum no dia a dia e reserve o azeite para finalizar saladas.</td>
                  </tr>
                  <tr>
                    <td><strong>Temperos</strong></td>
                    <td>Alho, cebola, louro, cominho, colorau, limão, ervas frescas</td>
                    <td>Tempere bem a comida em vez de recorrer a temperos prontos industrializados.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="kf-ebook-callout kf-callout-info">
              💡 <strong>Hábito de Ouro:</strong> Planejar as compras da semana antes de ir ao mercado, com base no cardápio. Isso evita compras por impulso e desperdício de alimentos esquecidos na geladeira.
            </div>
          </div>
        `
      },
      {
        id: 'cardapio',
        number: 5,
        title: 'Cardápio semanal completo (7 dias)',
        html: `
          <div class="kf-ebook-chapter">
            <p>Este cardápio é um ponto de partida, não uma regra rígida. Troque os alimentos por equivalentes da sua região e do seu gosto, mantendo a proporção do método do prato.</p>

            <div class="kf-ebook-table-responsive">
              <table class="kf-ebook-table kf-menu-table">
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Café da manhã</th>
                    <th>Almoço</th>
                    <th>Jantar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Segunda</strong></td>
                    <td>Panqueca de aveia + fruta</td>
                    <td>Arroz, feijão, frango desfiado ao molho, salada de repolho</td>
                    <td>Sopa de legumes com carne moída</td>
                  </tr>
                  <tr>
                    <td><strong>Terça</strong></td>
                    <td>Ovo mexido + fruta</td>
                    <td>Arroz, feijão, purê de batata-doce, frango grelhado</td>
                    <td>Omelete de forno com legumes</td>
                  </tr>
                  <tr>
                    <td><strong>Quarta</strong></td>
                    <td>Vitamina de banana com aveia</td>
                    <td>Arroz, feijão, escondidinho de mandioca com carne</td>
                    <td>Salada de grão-de-bico com sardinha</td>
                  </tr>
                  <tr>
                    <td><strong>Quinta</strong></td>
                    <td>Panqueca de aveia + fruta</td>
                    <td>Arroz de forno com sardinha, salada de repolho</td>
                    <td>Sopa de legumes</td>
                  </tr>
                  <tr>
                    <td><strong>Sexta</strong></td>
                    <td>Ovo mexido + fruta</td>
                    <td>Feijão tropeiro, frango grelhado, salada</td>
                    <td>Omelete de forno com legumes</td>
                  </tr>
                  <tr>
                    <td><strong>Sábado</strong></td>
                    <td>Vitamina de banana com aveia</td>
                    <td>Arroz, feijão, carne moída, legumes refogados</td>
                    <td>Salada de grão-de-bico com atum</td>
                  </tr>
                  <tr>
                    <td><strong>Domingo</strong></td>
                    <td>Café da manhã livre e equilibrado</td>
                    <td>Almoço em família, priorizando o método do prato</td>
                    <td>Refeição mais leve, como sopa ou salada completa</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="kf-ebook-callout kf-callout-info" style="margin-top: 14px;">
              ☕ <strong>Lanches da tarde simples:</strong> Fruta com aveia, vitamina de banana, um punhado de amendoim ou um ovo cozido são opções baratas e saciantes para os intervalos entre as refeições principais.
            </div>
          </div>
        `
      },
      {
        id: 'receitas',
        number: 6,
        title: '12 receitas práticas, baratas e saudáveis',
        html: `
          <div class="kf-ebook-chapter">
            <p>As receitas a seguir usam ingredientes acessíveis e foram organizadas para caber no cardápio semanal com estimativa de custo por porção.</p>

            <div class="kf-recipes-list">
              <!-- Receita 1 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>1. Omelete de forno com legumes</h4>
                  <span class="kf-recipe-meta">⏱ 25 min • 🍽 4 porções • 💰 ≈ R$ 2,00/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 6 ovos, 1 cenoura ralada, 1/2 cebola picada, 1 xícara de couve ou espinafre picado, sal, pimenta-do-reino e cheiro-verde a gosto.</p>
                <p><strong>Modo de preparo:</strong> 1. Bata os ovos em uma tigela e tempere. 2. Misture os legumes picados. 3. Despeje em forma untada e leve ao forno médio (180°C) por 20 minutos. 4. Corte em fatias e sirva quente ou frio.</p>
                <div class="kf-recipe-tip">💡 Dica: Congela bem em potes individuais por até 2 meses — ótima opção para marmita.</div>
              </div>

              <!-- Receita 2 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>2. Frango desfiado ao molho de tomate</h4>
                  <span class="kf-recipe-meta">⏱ 35 min • 🍽 6 porções • 💰 ≈ R$ 2,50/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 500 g de peito ou sobrecoxa de frango, 2 tomates ou 1/2 lata de molho, 1 cebola, 2 dentes de alho, sal, colorau e louro.</p>
                <p><strong>Modo de preparo:</strong> 1. Cozinhe o frango em água com sal e louro até amaciar. 2. Desfie e reserve o caldo. 3. Refogue cebola e alho, junte o tomate e um pouco do caldo. 4. Junte o frango desfiado e deixe apurar por 10 min.</p>
                <div class="kf-recipe-tip">💡 Dica: A sobrecoxa desossada é mais barata e mantém-se muito mais suculenta.</div>
              </div>

              <!-- Receita 3 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>3. Feijão tropeiro simplificado</h4>
                  <span class="kf-recipe-meta">⏱ 20 min • 🍽 5 porções • 💰 ≈ R$ 1,80/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 2 xícaras de feijão cozido (escorrido), 1 ovo, 1 cebola picada, 2 dentes de alho, farinha de mandioca a gosto, cheiro-verde.</p>
                <p><strong>Modo de preparo:</strong> 1. Refogue cebola e alho, adicione o ovo mexido e desmanche. 2. Junte o feijão escorrido e misture. 3. Polvilhe a farinha aos poucos até dar liga, sem empapar. 4. Finalize com cheiro-verde.</p>
                <div class="kf-recipe-tip">💡 Dica: Aproveita o feijão do dia anterior, reduzindo desperdício e tempo.</div>
              </div>

              <!-- Receita 4 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>4. Sopa de legumes com carne moída</h4>
                  <span class="kf-recipe-meta">⏱ 30 min • 🍽 6 porções • 💰 ≈ R$ 2,30/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 300 g de carne moída (patinho ou acém), 2 batatas, 2 cenouras, 1 chuchu, 1 cebola, 2 dentes de alho, sal e louro.</p>
                <p><strong>Modo de preparo:</strong> 1. Refogue a carne moída com cebola e alho até dourar. 2. Adicione os legumes picados e cubra com água. 3. Cozinhe em fogo médio por 20 min até ficarem macios. 4. Ajuste o sal e sirva quente.</p>
                <div class="kf-recipe-tip">💡 Dica: Perfeita para usar sobras de legumes da geladeira em dias frescos.</div>
              </div>

              <!-- Receita 5 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>5. Salada de grão-de-bico com sardinha</h4>
                  <span class="kf-recipe-meta">⏱ 15 min • 🍽 3 porções • 💰 ≈ R$ 3,30/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 2 xícaras de grão-de-bico cozido, 1 lata de sardinha ou atum escorrido, 1 tomate picado, 1/4 cebola picada, azeite ou óleo, limão, sal e cheiro-verde.</p>
                <p><strong>Modo de preparo:</strong> 1. Misture o grão-de-bico com o tomate e a cebola. 2. Acrescente a sardinha escorrida. 3. Tempere com limão, azeite, sal e cheiro-verde.</p>
                <div class="kf-recipe-tip">💡 Dica: Prato pronto em 15 minutos que não precisa de fogão. Excelente fonte de ômega-3.</div>
              </div>

              <!-- Receita 6 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>6. Panqueca de aveia (café da manhã)</h4>
                  <span class="kf-recipe-meta">⏱ 10 min • 🍽 2 porções • 💰 ≈ R$ 2,00/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 1 banana amassada, 2 ovos, 3 colheres (sopa) de aveia em flocos, canela a gosto.</p>
                <p><strong>Modo de preparo:</strong> 1. Misture todos os ingredientes até formar massa homogênea. 2. Despeje pequenas porções em frigideira antiaderente quente. 3. Doure dos dois lados em fogo baixo.</p>
                <div class="kf-recipe-tip">💡 Dica: Sem açúcar adicionado — a doçura natural vem da banana madura.</div>
              </div>

              <!-- Receita 7 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>7. Arroz de forno com sardinha</h4>
                  <span class="kf-recipe-meta">⏱ 35 min • 🍽 6 porções • 💰 ≈ R$ 2,00/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 3 xícaras de arroz cozido, 2 latas de sardinha, 1 tomate, 1 cebola, milho (opcional), um fio de óleo e sal.</p>
                <p><strong>Modo de preparo:</strong> 1. Misture o arroz cozido com a sardinha amassada, tomate e cebola. 2. Coloque em refratário untado. 3. Leve ao forno médio por 15 minutos até dourar levemente.</p>
                <div class="kf-recipe-tip">💡 Dica: Transforma sobras de arroz em uma refeição completa e deliciosa.</div>
              </div>

              <!-- Receita 8 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>8. Purê de batata-doce com frango grelhado</h4>
                  <span class="kf-recipe-meta">⏱ 30 min • 🍽 4 porções • 💰 ≈ R$ 3,25/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 3 batatas-doces médias, 400 g de filé de frango, sal, alho, pimenta-do-reino e cheiro-verde.</p>
                <p><strong>Modo de preparo:</strong> 1. Cozinhe as batatas-doces até ficarem macias e amasse até virar purê. 2. Tempere o frango e grelhe em frigideira com pouco óleo. 3. Sirva o frango fatiado sobre o purê.</p>
                <div class="kf-recipe-tip">💡 Dica: A batata-doce sacia por muito mais tempo e possui índice glicêmico estável.</div>
              </div>

              <!-- Receita 9 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>9. Suco verde econômico</h4>
                  <span class="kf-recipe-meta">⏱ 5 min • 🍽 2 copos • 💰 ≈ R$ 1,50/copo</span>
                </div>
                <p><strong>Ingredientes:</strong> 2 folhas de couve, suco de 1 limão, 1 fatia de abacaxi ou 1 maçã, 300 ml de água.</p>
                <p><strong>Modo de preparo:</strong> 1. Bata todos os ingredientes no liquidificador. 2. Coe se preferir textura mais leve. 3. Sirva imediatamente gelado.</p>
                <div class="kf-recipe-tip">💡 Dica: Use sempre frutas da época para maximizar os nutrientes e reduzir o custo.</div>
              </div>

              <!-- Receita 10 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>10. Escondidinho de mandioca com carne moída</h4>
                  <span class="kf-recipe-meta">⏱ 40 min • 🍽 6 porções • 💰 ≈ R$ 2,70/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 700 g de mandioca cozida, 300 g de carne moída, 1 cebola, 2 dentes de alho, 1 tomate, sal e óleo.</p>
                <p><strong>Modo de preparo:</strong> 1. Amasse a mandioca cozida até formar um purê. 2. Refogue a carne moída com cebola, alho e tomate. 3. Monte em camadas (purê, carne, purê) em um refratário. 4. Leve ao forno por 15 min até dourar.</p>
                <div class="kf-recipe-tip">💡 Dica: A mandioca custa em média menos da metade da batata inglesa e rende muito.</div>
              </div>

              <!-- Receita 11 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>11. Refogado de repolho com cenoura</h4>
                  <span class="kf-recipe-meta">⏱ 10 min • 🍽 4 porções • 💰 ≈ R$ 1,00/porção</span>
                </div>
                <p><strong>Ingredientes:</strong> 1/2 repolho fatiado fino, 1 cenoura ralada, 1 dente de alho, sal e um fio de óleo.</p>
                <p><strong>Modo de preparo:</strong> 1. Refogue o alho no óleo até dourar levemente. 2. Adicione o repolho e a cenoura. 3. Refogue em fogo alto por 5 minutos, mexendo sempre sem murchar demais.</p>
                <div class="kf-recipe-tip">💡 Dica: Um dos acompanhamentos mais baratos e ricos em fibras e crocância.</div>
              </div>

              <!-- Receita 12 -->
              <div class="kf-recipe-card">
                <div class="kf-recipe-header">
                  <h4>12. Vitamina de banana com aveia</h4>
                  <span class="kf-recipe-meta">⏱ 5 min • 🍽 1 porção • 💰 ≈ R$ 2,50</span>
                </div>
                <p><strong>Ingredientes:</strong> 1 banana, 1 copo de leite (ou bebida vegetal), 2 colheres (sopa) de aveia, canela a gosto.</p>
                <p><strong>Modo de preparo:</strong> 1. Bata todos os ingredientes no liquidificador. 2. Sirva bem gelado.</p>
                <div class="kf-recipe-tip">💡 Dica: Substitui com excelência um lanche industrializado da tarde com muito mais saciedade.</div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'marmitas',
        number: 7,
        title: 'Marmita da semana: monte em uma tarde',
        html: `
          <div class="kf-ebook-chapter">
            <p>Reservar de 1h30 a 2h no domingo (ou no seu dia de folga) para preparar as bases da semana economiza tempo, dinheiro e reduz a tentação de pedir comida pronta nos dias corridos.</p>

            <div class="kf-ebook-steps-list">
              <div class="kf-step-item">
                <span class="kf-step-num">1</span>
                <div>
                  <strong>Cozinhe as bases em grande volume:</strong>
                  <p>Prepare o arroz e o feijão (ou lentilha/grão-de-bico) para a semana toda de uma só vez.</p>
                </div>
              </div>
              <div class="kf-step-item">
                <span class="kf-step-num">2</span>
                <div>
                  <strong>Prepare a proteína:</strong>
                  <p>Faça o frango desfiado ao molho ou carne moída refogada e divida em porções individuais.</p>
                </div>
              </div>
              <div class="kf-step-item">
                <span class="kf-step-num">3</span>
                <div>
                  <strong>Legumes resistentes:</strong>
                  <p>Cozinhe no vapor ou refogue legumes que mantêm boa textura (cenoura, abobrinha, chuchu, brócolis).</p>
                </div>
              </div>
              <div class="kf-step-item">
                <span class="kf-step-num">4</span>
                <div>
                  <strong>Montagem equilibrada:</strong>
                  <p>Monte os potes seguindo o método do prato: metade legumes, 1/4 proteína e 1/4 carboidrato.</p>
                </div>
              </div>
              <div class="kf-step-item">
                <span class="kf-step-num">5</span>
                <div>
                  <strong>Armazenamento correto:</strong>
                  <p>Guarde na geladeira as marmitas dos próximos 2 a 3 dias e congele o restante em potes bem vedados.</p>
                </div>
              </div>
            </div>

            <div class="kf-ebook-callout kf-callout-alert" style="margin-top: 16px;">
              🛡 <strong>Cuidados de Segurança Alimentar:</strong>
              <ul>
                <li>Deixe a comida esfriar por no máximo 2 horas fora da geladeira antes de guardar.</li>
                <li>Consuma o que está na geladeira em até 3-4 dias.</li>
                <li>Congele o restante e sempre descongele dentro da geladeira, nunca em temperatura ambiente.</li>
                <li>Sempre reaqueça bem antes de consumir, principalmente carnes e aves.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        id: 'substituicoes',
        number: 8,
        title: 'Substituições inteligentes',
        html: `
          <div class="kf-ebook-chapter">
            <p>Nem sempre o ingrediente "da moda" é necessário para comer bem. A tabela abaixo mostra trocas acessíveis que mantêm o valor nutricional gastando bem menos.</p>

            <div class="kf-ebook-table-responsive">
              <table class="kf-ebook-table">
                <thead>
                  <tr>
                    <th>Ingrediente caro</th>
                    <th>Substituto acessível</th>
                    <th>Por que funciona</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quinoa</td>
                    <td>Aveia em flocos ou arroz integral</td>
                    <td>Rica em fibras e nutrientes, por uma fração do preço.</td>
                  </tr>
                  <tr>
                    <td>Salmão</td>
                    <td>Sardinha ou atum em lata</td>
                    <td>Excelente fonte de ômega-3 e proteína com custo muito menor.</td>
                  </tr>
                  <tr>
                    <td>Castanhas importadas</td>
                    <td>Amendoim torrado sem sal</td>
                    <td>Fonte abundante de gorduras boas e proteína vegetal nacional.</td>
                  </tr>
                  <tr>
                    <td>Iogurte grego caro</td>
                    <td>Iogurte natural integral</td>
                    <td>Perfil nutricional idêntico por um preço bem mais acessível.</td>
                  </tr>
                  <tr>
                    <td>Frutas vermelhas importadas</td>
                    <td>Frutas da estação (mamão, banana, laranja)</td>
                    <td>Mais baratas, mais frescas e igualmente ricas em antioxidantes.</td>
                  </tr>
                  <tr>
                    <td>Suplementos proteicos caros</td>
                    <td>Ovos, feijão, frango, sardinha</td>
                    <td>Cobrem a necessidade diária de proteína sem custo adicional.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      },
      {
        id: 'erros',
        number: 9,
        title: 'Erros mais comuns',
        html: `
          <div class="kf-ebook-chapter">
            <div class="kf-ebook-mistakes-list">
              <div class="kf-mistake-card">
                <strong>❌ Cortar completamente os carboidratos</strong>
                <p>Gera cansaço extremo, irritabilidade e desistência precoce na primeira semana.</p>
              </div>
              <div class="kf-mistake-card">
                <strong>❌ Pular refeições achando que acelera o emagrecimento</strong>
                <p>Geralmente dispara episódios de compulsão e fome descontrolada nas refeições seguintes.</p>
              </div>
              <div class="kf-mistake-card">
                <strong>❌ Comprar suplementos caros antes de ajustar o básico</strong>
                <p>Nenhum pó ou pílula compensa noites mal dormidas e falta de vegetais no prato.</p>
              </div>
              <div class="kf-mistake-card">
                <strong>❌ Ir ao mercado sem lista e sem cardápio</strong>
                <p>Aumenta compras por impulso e desperdício de itens que estragam na gaveta da geladeira.</p>
              </div>
              <div class="kf-mistake-card">
                <strong>❌ Confundir produtos "fit/diet" com saudáveis</strong>
                <p>Muitos são ultraprocessados com excesso de sódio ou gordura. Leia sempre a lista de ingredientes.</p>
              </div>
              <div class="kf-mistake-card">
                <strong>❌ Esperar resultados imediatos e desistir</strong>
                <p>O corpo precisa de semanas para se adaptar a novos hábitos. A consistência é a chave.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'conclusao',
        number: 10,
        title: 'Considerações finais',
        html: `
          <div class="kf-ebook-chapter">
            <p>Comer bem gastando pouco não depende de ingredientes caros ou receitas complicadas — depende principalmente de planejamento, organização e consistência ao longo das semanas.</p>
            <p>Use o cardápio e as receitas deste guia como ponto de partida, ajustando aos poucos ao seu gosto, à sua rotina e ao seu orçamento. Pequenas mudanças mantidas por meses valem mais do que mudanças radicais que duram poucos dias.</p>
            
            <div class="kf-ebook-callout kf-callout-info">
              Este material tem caráter educativo e informativo. Para orientações personalizadas — especialmente em caso de condições de saúde específicas, gestação, restrições alimentares ou uso de medicamentos — procure um nutricionista ou médico de confiança.
            </div>

            <div class="kf-ebook-quote">
              “Você não precisa ser perfeito. Você precisa ser consistente.”
            </div>
          </div>
        `
      }
    ]
  },

  'korean-lifestyle': {
    id: 'korean-lifestyle',
    title: 'Korean Lifestyle: Método de Hábitos Coreanos',
    subtitle: 'Mentalidade, hábitos e uma rotina mais leve',
    tagline: 'Um guia para viver com mais intenção',
    koreanSubtitle: '한국 라이프스타일 · 의도적인 삶을 위한 가이드',
    coverImage: 'assets/ebooks/cover-korean-lifestyle.jpg',
    pdfFile: 'assets/ebooks/korean-lifestyle.pdf',
    totalPages: 13,
    chapters: [
      {
        id: 'sobre',
        number: 1,
        title: 'Sobre este guia',
        html: `
          <div class="kf-ebook-chapter">
            <h3>Para quem é este material</h3>
            <p>Este guia é para quem se interessa pela cultura coreana — k-pop, k-dramas, skincare, a disciplina que se vê de fora — e quer ir além da curiosidade: entender os hábitos e a mentalidade por trás dela, e adaptar o que realmente funciona para a rotina brasileira.</p>
            <p>Você não precisa saber nada sobre a Coreia do Sul para usar este guia. Cada conceito é explicado de forma simples, com uma tradução prática para o seu dia a dia.</p>

            <div class="kf-ebook-callout kf-callout-success">
              <h4>O que este guia promete</h4>
              <ul>
                <li>Explicar 5 conceitos centrais da mentalidade coreana, sem enrolação.</li>
                <li>Traduzir hábitos coreanos de rotina, alimentação, beleza, organização, estudo e movimento em ações simples e baratas de aplicar no Brasil.</li>
                <li>Entregar um plano de 21 dias para sair da teoria e transformar isso em rotina de verdade.</li>
              </ul>
            </div>

            <div class="kf-ebook-callout kf-callout-alert">
              <h4>O que este guia NÃO é</h4>
              <p>Este material não promove a ideia de que "tudo que vem da Coreia é perfeito". A própria sociedade coreana debate abertamente os efeitos colaterais de uma cultura de excesso de trabalho e de pressão estética — e este guia é sobre extrair o que é saudável e aplicável, deixando de lado o que não serve. Também não substitui acompanhamento profissional.</p>
            </div>

            <div class="kf-ebook-quote">
              “A ideia aqui não é copiar uma cultura inteira. É pegar hábitos que funcionam, traduzir para a sua realidade e repetir até virarem naturais.”
            </div>
          </div>
        `
      },
      {
        id: 'conceitos',
        number: 2,
        title: 'A mentalidade coreana: 5 conceitos que mudam tudo',
        html: `
          <div class="kf-ebook-chapter">
            <p>Antes de qualquer rotina, existe uma forma de pensar. Estes cinco conceitos aparecem por trás da maioria dos hábitos coreanos que você vê nas redes — e cada um deles tem uma aplicação prática para o dia a dia no Brasil.</p>

            <div class="kf-concepts-list">
              <div class="kf-concept-card">
                <div class="kf-concept-header">
                  <span class="kf-concept-hangul">갓생 (Godsaeng)</span>
                  <span class="kf-concept-trans">"Vida no rumo certo"</span>
                </div>
                <p><strong>Significado:</strong> Viver com disciplina e propósito, mesmo nas coisas pequenas do dia a dia.</p>
                <div class="kf-concept-apply">👉 <strong>Como aplicar no Brasil:</strong> Definir 1 a 3 metas pequenas por dia e acompanhar o progresso, celebrando as vitórias simples.</div>
              </div>

              <div class="kf-concept-card">
                <div class="kf-concept-header">
                  <span class="kf-concept-hangul">눈치 (Nunchi)</span>
                  <span class="kf-concept-trans">"Sensibilidade social"</span>
                </div>
                <p><strong>Significado:</strong> Perceber o ambiente e as pessoas ao redor antes de agir ou falar.</p>
                <div class="kf-concept-apply">👉 <strong>Como aplicar no Brasil:</strong> Prestar mais atenção em como sua fala e seu humor afetam quem está por perto, ajustando o tom com empatia.</div>
              </div>

              <div class="kf-concept-card">
                <div class="kf-concept-header">
                  <span class="kf-concept-hangul">정 (Jeong)</span>
                  <span class="kf-concept-trans">"Vínculo afetivo profundo"</span>
                </div>
                <p><strong>Significado:</strong> Senso de comunidade, carinho genuíno e pertencimento.</p>
                <div class="kf-concept-apply">👉 <strong>Como aplicar no Brasil:</strong> Investir em poucas relações de verdade, com gestos simples e constantes de cuidado.</div>
              </div>

              <div class="kf-concept-card">
                <div class="kf-concept-header">
                  <span class="kf-concept-hangul">소확행 (Sohwakhaeng)</span>
                  <span class="kf-concept-trans">"Pequena felicidade certa"</span>
                </div>
                <p><strong>Significado:</strong> Prazeres simples e garantidos do cotidiano que trazem paz.</p>
                <div class="kf-concept-apply">👉 <strong>Como aplicar no Brasil:</strong> Criar 1 ritual diário de prazer garantido — um café quentinho, uma música calma, um banho mais demorado.</div>
              </div>

              <div class="kf-concept-card">
                <div class="kf-concept-header">
                  <span class="kf-concept-hangul">빨리빨리 (Ppalli-ppalli)</span>
                  <span class="kf-concept-trans">"Agilidade e eficiência"</span>
                </div>
                <p><strong>Significado:</strong> Cultura da rapidez e resolução sem enrolação.</p>
                <div class="kf-concept-apply">👉 <strong>Como aplicar no Brasil:</strong> Usar em tarefas repetitivas do dia a dia para ganhar tempo livre, sem transformar tudo em urgência constante.</div>
              </div>
            </div>

            <div class="kf-ebook-callout kf-callout-alert" style="margin-top: 16px;">
              ⚠️ <strong>Vale um alerta:</strong> Levada ao extremo, essa cultura de agilidade e disciplina constante também alimenta esgotamento. O objetivo aqui é equilíbrio: usar esses conceitos a seu favor, não contra você.
            </div>
          </div>
        `
      },
      {
        id: 'rotina-matinal',
        number: 3,
        title: 'Rotina matinal: comece o dia no Modo K',
        html: `
          <div class="kf-ebook-chapter">
            <p>A base do <em>godsaeng</em> não é acordar às 5h — é ter um começo de dia consistente, mesmo que pequeno. Esta sequência leva menos de 30 minutos:</p>

            <div class="kf-morning-routine-steps">
              <div class="kf-routine-step">
                <span class="kf-routine-num">1</span>
                <div>
                  <strong>Horário consistente:</strong>
                  <p>Acorde no mesmo horário todos os dias, inclusive no fim de semana (dentro do possível).</p>
                </div>
              </div>
              <div class="kf-routine-step">
                <span class="kf-routine-num">2</span>
                <div>
                  <strong>Hidratação imediata:</strong>
                  <p>Beba um copo de água antes de qualquer outra coisa ao levantar da cama.</p>
                </div>
              </div>
              <div class="kf-routine-step">
                <span class="kf-routine-num">3</span>
                <div>
                  <strong>Luz natural:</strong>
                  <p>Abra a janela ou saia para pegar luz natural no rosto por alguns minutos para regular o ciclo circadiano.</p>
                </div>
              </div>
              <div class="kf-routine-step">
                <span class="kf-routine-num">4</span>
                <div>
                  <strong>5 minutos de movimento:</strong>
                  <p>Faça 5 minutos de alongamento leve ou postura para acordar a coluna.</p>
                </div>
              </div>
              <div class="kf-routine-step">
                <span class="kf-routine-num">5</span>
                <div>
                  <strong>Defina as prioridades:</strong>
                  <p>Escreva de 1 a 3 prioridades do dia no papel — não mais do que isso.</p>
                </div>
              </div>
              <div class="kf-routine-step">
                <span class="kf-routine-num">6</span>
                <div>
                  <strong>Café sem telas:</strong>
                  <p>Tome um café da manhã leve, sem pressa e sem tela de celular junto.</p>
                </div>
              </div>
            </div>

            <div class="kf-ebook-quote">
              “O segredo não está na hora que você acorda. Está em repetir a mesma sequência todos os dias até ela virar automática.”
            </div>
          </div>
        `
      },
      {
        id: 'alimentacao-coreana',
        number: 4,
        title: 'Alimentação à coreana, adaptada ao Brasil',
        html: `
          <div class="kf-ebook-chapter">
            <p>A refeição coreana tradicional é montada com o arroz e uma variedade de pequenos pratos (<em>banchan</em>) ao redor — pouco de cada coisa, mas muita variedade de vegetais, fermentados e proteínas magras. Dá para aplicar essa lógica com ingredientes 100% brasileiros.</p>

            <div class="kf-ebook-table-responsive">
              <table class="kf-ebook-table">
                <thead>
                  <tr>
                    <th>Hábito coreano</th>
                    <th>Adaptação para o Brasil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Prato principal + vários acompanhamentos pequenos (Banchan)</strong></td>
                    <td>Arroz e feijão como base + 2 ou 3 porções pequenas de vegetais variados (legumes refogados, salada fresca, verdura).</td>
                  </tr>
                  <tr>
                    <td><strong>Alimentos fermentados no dia a dia (Kimchi)</strong></td>
                    <td>Picles caseiro de repolho ou cenoura, chucrute simples ou iogurte natural.</td>
                  </tr>
                  <tr>
                    <td><strong>Comer devagar, em grupo, sem pressa</strong></td>
                    <td>Reservar ao menos uma refeição do dia sem celular na mão, sentado à mesa.</td>
                  </tr>
                  <tr>
                    <td><strong>Chá quente depois das refeições</strong></td>
                    <td>Chá de ervas brasileiras (erva-cidreira, camomila, hortelã) morno após almoço ou jantar.</td>
                  </tr>
                  <tr>
                    <td><strong>Porções menores, mais vezes ao longo do dia</strong></td>
                    <td>Evitar pular refeições e priorizar lanches simples entre elas (fruta, ovo, castanhas).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style="margin-top: 14px;">Não é sobre contar calorias ou seguir regras rígidas — é sobre variedade, menos ultraprocessado e mais atenção ao momento da refeição.</p>
          </div>
        `
      },
      {
        id: 'skincare',
        number: 5,
        title: 'Skincare e autocuidado: rotina simples de verdade',
        html: `
          <div class="kf-ebook-chapter">
            <p>A rotina coreana de skincare ficou famosa por ter até 10 passos — mas o que realmente sustenta uma pele saudável não é a quantidade de produtos, é a consistência. Uma versão simples e acessível:</p>

            <div class="kf-skincare-steps">
              <div class="kf-skin-step"><strong>1. Limpeza suave:</strong> Lavar o rosto de manhã e à noite com sabonete suave.</div>
              <div class="kf-skin-step"><strong>2. Hidratação diária:</strong> Hidratante todos os dias, inclusive em peles oleosas.</div>
              <div class="kf-skin-step"><strong>3. Protetor solar matinal:</strong> O passo mais importante e inegociável de todos.</div>
              <div class="kf-skin-step"><strong>4. Água constante:</strong> Beber água em pequenos goles ao longo de todo o dia.</div>
              <div class="kf-skin-step"><strong>5. Sono restaurador:</strong> Dormir o suficiente — a pele também descansa e se renova à noite.</div>
            </div>

            <p style="margin-top: 14px;">Você não precisa de 10 produtos importados para ter uma rotina eficiente. Esses 5 passos, feitos todos os dias, valem mais do que qualquer produto caro usado de vez em quando.</p>

            <div class="kf-ebook-quote">
              “Cuidar da pele é sobre saúde e autocuidado, não sobre perseguir um padrão de beleza inalcançável. Adapte o que fizer sentido para você — e ignore o resto.”
            </div>
          </div>
        `
      },
      {
        id: 'organizacao',
        number: 6,
        title: 'Organização e minimalismo estilo coreano',
        html: `
          <div class="kf-ebook-chapter">
            <p>Casas e espaços de trabalho organizados fazem parte do estilo de vida coreano urbano — não por perfeccionismo, mas porque ambientes mais limpos reduzem a fadiga mental no dia a dia.</p>

            <ul class="kf-minimalism-list">
              <li><strong>Regra do "um entra, um sai":</strong> ao comprar algo novo, doe ou descarte algo equivalente.</li>
              <li><strong>Ritual noturno de 10 minutos:</strong> organizar a mesa e o ambiente antes de dormir para acordar em paz.</li>
              <li><strong>Mesa de trabalho limpa:</strong> no início e no fim do expediente.</li>
              <li><strong>Revisão semestral:</strong> uma vez por mês, separe o que não usa há 6 meses para doação.</li>
            </ul>

            <div class="kf-ebook-callout kf-callout-info">
              Esses pequenos rituais evitam o acúmulo — e o acúmulo é, na prática, o que mais rouba tempo e energia da sua rotina.
            </div>
          </div>
        `
      },
      {
        id: 'produtividade',
        number: 7,
        title: 'Produtividade e estudo: hábitos de foco',
        html: `
          <div class="kf-ebook-chapter">
            <p>A cultura de estudo coreana é conhecida pela intensidade — e também pela pressão excessiva que ela pode gerar. A parte que vale a pena aproveitar é a técnica de foco, não a pressão.</p>

            <ul>
              <li><strong>Blocos de foco:</strong> 50 minutos de atenção total em uma única tarefa, seguidos de 10 minutos de pausa real sem telas.</li>
              <li><strong>Ambiente dedicado:</strong> sempre que possível, estude ou trabalhe no mesmo lugar, sem distrações por perto.</li>
              <li><strong>Planejamento semanal:</strong> planeje a semana em blocos, não só o dia — isso reduz a sensação de estar sempre correndo atrás.</li>
              <li><strong>Revisão semanal curta:</strong> o que funcionou, o que não funcionou, o que ajustar para a próxima.</li>
              <li><strong>Evite multitarefa:</strong> fazer uma coisa de cada vez costuma ser mais rápido do que fazer três ao mesmo tempo, mal feitas.</li>
            </ul>

            <div class="kf-ebook-quote">
              “Foco não é sobre trabalhar mais horas. É sobre proteger blocos de tempo para o que realmente importa.”
            </div>
          </div>
        `
      },
      {
        id: 'movimento',
        number: 8,
        title: 'Movimento e disciplina física',
        html: `
          <div class="kf-ebook-chapter">
            <p>Caminhar faz parte do cotidiano coreano de um jeito natural — inclusive a tradição de caminhadas e trilhas (<em>deungsan</em>) nos fins de semana, praticada por todas as idades. Não é preciso academia cara para adotar esse hábito.</p>

            <ul>
              <li>Caminhe todos os dias, mesmo que por 20 a 30 minutos — de preferência ao ar livre.</li>
              <li>Prefira escadas em vez de elevador sempre que for viável.</li>
              <li>Alongue-se pela manhã e antes de dormir, 5 minutos bastam.</li>
              <li>Busque uma atividade em grupo (caminhada, esporte, dança) — o vínculo social ajuda a manter a consistência.</li>
            </ul>

            <div class="kf-ebook-callout kf-callout-success">
              O objetivo não é performance atlética, é movimento constante e sustentável ao longo da semana.
            </div>
          </div>
        `
      },
      {
        id: 'equilibrio',
        number: 9,
        title: 'Equilíbrio emocional e social',
        html: `
          <div class="kf-ebook-chapter">
            <p>Nenhuma rotina se sustenta sem equilíbrio emocional. Aqui, três conceitos do capítulo 2 voltam à prática do dia a dia:</p>

            <ul>
              <li><strong>Use o nunchi:</strong> perceba quando alguém (ou você mesmo) precisa de um espaço, uma pausa ou uma palavra de apoio.</li>
              <li><strong>Cultive o jeong:</strong> mantenha contato regular com poucas pessoas de confiança, mesmo que só uma mensagem carinhosa por semana.</li>
              <li><strong>Reserve seu sohwakhaeng:</strong> pelo menos um prazer pequeno e garantido por dia, sem culpa.</li>
              <li><strong>Estabeleça limites:</strong> hora de parar de trabalhar é hora de parar.</li>
              <li><strong>Apoio quando necessário:</strong> se sentir ansiedade ou cansaço excessivo, procurar apoio profissional é sinal de autocuidado e sabedoria.</li>
            </ul>
          </div>
        `
      },
      {
        id: 'desafio-21-dias',
        number: 10,
        title: 'Plano de 21 dias: Desafio Modo K',
        html: `
          <div class="kf-ebook-chapter">
            <p>Um plano gradual para transformar os capítulos anteriores em rotina — uma semana de cada vez, sem tentar mudar tudo de uma vez.</p>

            <div class="kf-ebook-table-responsive">
              <table class="kf-ebook-table">
                <thead>
                  <tr>
                    <th>Semana</th>
                    <th>Foco</th>
                    <th>Hábitos a praticar todos os dias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Semana 1</strong></td>
                    <td>Fundamentos</td>
                    <td>Rotina matinal completa + 1 copo de água ao acordar + 1 sohwakhaeng por dia</td>
                  </tr>
                  <tr>
                    <td><strong>Semana 2</strong></td>
                    <td>Corpo e alimentação</td>
                    <td>Manter a semana 1 + skincare de 5 passos + 1 refeição sem tela por dia</td>
                  </tr>
                  <tr>
                    <td><strong>Semana 3</strong></td>
                    <td>Produtividade e movimento</td>
                    <td>Manter as semanas 1 e 2 + 1 bloco de foco de 50 minutos por dia + caminhada diária</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="kf-ebook-callout kf-callout-info" style="margin-top: 14px;">
              No fim das 3 semanas, faça uma revisão simples: quais hábitos ficaram fáceis, quais ainda pedem esforço, e quais valem continuar. Esse é o verdadeiro espírito do <em>godsaeng</em> — ajustar sempre, desistir nunca.
            </div>
          </div>
        `
      },
      {
        id: 'consideracoes',
        number: 11,
        title: 'Considerações finais',
        html: `
          <div class="kf-ebook-chapter">
            <p>Os hábitos deste guia não pedem nenhuma mudança radical de uma vez só — pedem repetição. É a soma de pequenas escolhas diárias, sustentadas por semanas e meses, que gera a transformação que costuma ser atribuída a "força de vontade".</p>
            <p>Use este material como um ponto de partida. Adapte, teste, descarte o que não fizer sentido para sua rotina e mantenha o que funcionar — esse ajuste constante é, também, um hábito.</p>

            <div class="kf-ebook-callout kf-callout-info">
              Este material tem caráter educativo e cultural. Para questões específicas de saúde física, mental, nutricional ou dermatológica, procure sempre um profissional qualificado.
            </div>

            <div class="kf-ebook-quote">
              “Vida no rumo certo não é sobre perfeição. É sobre continuar, um dia de cada vez.”
            </div>
          </div>
        `
      }
    ]
  }
};

export function getEbookContent(id) {
  return EBOOKS_CONTENT[id] || null;
}
