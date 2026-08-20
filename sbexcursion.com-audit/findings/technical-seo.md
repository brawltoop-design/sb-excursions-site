# Technical SEO — 85/100

## Что работает
- 95% страниц в индексе (1328 из 1399)
- Каноникл на себя у всех 140 туровых страниц, ни одного noindex
- hreflang согласован: 0 ссылок на несуществующие страницы после раскатки немецкого
- robots.txt открыт для GPTBot, ClaudeBot, PerplexityBot и других AI-обходчиков

## Находки

### Цепочка редиректов с голого домена (Medium)
http://sbexcursion.com → https://sbexcursion.com → https://www.sbexcursion.com — два прыжка. Каждый прыжок теряет часть веса ссылки и замедляет первый ответ.

**Что делать:** Настроить прямой редирект http://sbexcursion.com → https://www.sbexcursion.com одним шагом.

### Нет заголовков безопасности (Low)
Присутствует только strict-transport-security. Нет X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Content-Security-Policy.

**Что делать:** Добавить в vercel.json секцию headers. На ранжирование влияет слабо, но это гигиена и сигнал доверия.

### bali-review.html без canonical (Low)
Единственная содержательная страница сайта без тега canonical.

**Что делать:** Добавить самоссылающийся canonical.
