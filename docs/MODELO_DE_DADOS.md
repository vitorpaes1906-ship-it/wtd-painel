# Modelo de dados — WTD Intelligence

Banco: Supabase (Postgres), projeto "marketing-vitor", tabelas com prefixo `wtd_` (convivem com outros sistemas do projeto sem tocá-los).

| Tabela | O que guarda |
|---|---|
| `wtd_servicos` | **Planos**: nome, tipo (residencial, empresarial, adicional), mensalidade, velocidade (download/upload), taxa de instalação, fidelidade, descrição e se está ativo. A aba Planos mostra clientes e receita recorrente de cada um. |
| `wtd_clientes` | Clientes: cidade, serviço, situação, datas de ativação e cancelamento, motivo. |
| `wtd_instalacoes` | Solicitações de instalação: situação, datas de solicitação, agendamento e encerramento. |
| `wtd_chamados` | Chamados técnicos: prioridade, situação, abertura e resolução. |
| `wtd_lancamentos` | Receitas e despesas: data, valor, categoria, cidade, serviço, cliente, situação, forma de pagamento. |
| `wtd_agenda` | Compromissos: visitas técnicas, instalações, manutenções, reuniões e cobranças, com data, horário, cidade, cliente e responsável. A tela Agenda também mostra as instalações que têm data agendada. |
| `wtd_metas` | Meta de clientes ativos por mês (por cidade ou da empresa toda). |
| `wtd_membros` | Quem acessa o aplicativo hospedado e com qual papel (admin, gestor, operador, leitor). |
| `wtd_auditoria` | Histórico imutável de toda criação, alteração e exclusão. |

**Como o painel é calculado:** nada é digitado duas vezes. Clientes ativos, novos clientes e cancelamentos vêm das datas dos clientes; receita, despesa, resultado, inadimplência e receita por serviço vêm dos lançamentos; instalações pendentes e chamados abertos são a posição ao fim de cada semana; tempo de atendimento vem dos chamados resolvidos. Onde não há registro, o sistema mostra "Sem dados ainda" e não inventa números.

**Integridade:** restrições no banco impedem cliente cancelado sem data, valor ≤ 0, datas incoerentes etc. Excluir um serviço em uso é bloqueado.

**Segurança:** RLS em todas as tabelas. Papéis: *admin* e *gestor* veem e alteram tudo (financeiro e metas só eles); *operador* cria e edita cadastros operacionais; *leitor* só lê cadastros operacionais. Verificado no banco real: `supabase/tests/verificar_seguranca.sql`.
