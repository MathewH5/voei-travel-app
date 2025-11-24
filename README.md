## Funcionalidades Implementadas

### 1. Minhas Reservas (`/minhas-reservas`)
- Lista as reservas do usuário (requisição GET em `/reservas?userId=1`).
- Separação automática entre **Próximas Viagens** e **Viagens Anteriores**.
- Permite **cancelar** uma reserva (DELETE).
- Acesso ao voucher pelo link `/voucher/:id`.
- Utilização de diretivas Angular (`*ngIf`, `*ngFor`) e classes condicionais.
- Formatação de datas e valores com pipes (`date`, `currency`).

---

### 2. Voucher da Reserva (`/voucher/:id`)
- Carrega uma reserva específica usando parâmetro de rota.
- Exibe informações completas da reserva: destino, datas, valor total, status.
- Inclui botão para retornar à página de Minhas Reservas.

---

### 3. Formulário de Reserva (`/reservar/:tripId`)
- Recupera a viagem selecionada através da rota (`tripId`).
- Mostra um card com os dados da viagem.
- Formulário contendo:
  - data de ida  
  - data de volta  
  - quantidade de viajantes
- Validações básicas dos campos.
- Cálculo automático do valor total da reserva.
- Envio da reserva via **POST** para `/reservas`.
- Redirecionamento para Minhas Reservas após a criação.

---

## Services

### `ReservationsService`
Funções disponíveis:
- `getByUser(userId)`
- `getById(id)`
- `create(reserva)`
- `delete(id)`

Responsável por centralizar o acesso à API e organizar a lógica relacionada às reservas, utilizando `HttpClient`.

---

## API Fake (JSON-SERVER)
O sistema utiliza o arquivo `db.json`, contendo as coleções:
- `usuarios`
- `viagens`
- `reservas`

Para executar a API:
