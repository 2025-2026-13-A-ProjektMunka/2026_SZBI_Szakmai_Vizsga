// Adatbázis csatlakozás.
await import('./dbConnect.mjs');

// Route-ok kezelése.
await import('./routing/mainRouting.mjs');
await import('./routing/newBookRouting.mjs');
await import('./routing/allBooksRouting.mjs');
await import('./routing/userRouting.mjs');
await import('./routing/purchaseRouting.mjs');
await import('./routing/stripeRouting.mjs');
await import('./routing/failRouting.mjs');
