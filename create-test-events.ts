import { createCalendarEvent, buildEventDescription } from "./src/lib/gcal-server";

async function main() {
  const cancelUrl = "https://www.cleanetfresh.fr/annuler?token=test-token";
  const ownerPhone = "07 67 12 75 00";

  const getEmoji = (serviceId: string) => {
    switch (serviceId) {
      case "auto": return "🚗";
      case "canape": return "🛋️";
      case "matelas": return "🛏️";
      case "tapis": return "🧶";
      case "fin-de-bail": return "🏠";
      default: return "🧹";
    }
  };

  const tests = [
    {
      client_name: "Test Canapé",
      client_phone: "06 11 11 11 11",
      client_email: "test.canape@example.com",
      client_street: "1 Rue du Canapé",
      client_zip: "31000",
      client_city: "Toulouse",
      total_price: 138,
      items: [
        {
          service_id: "canape",
          service_name: "Nettoyage Canapé",
          formule_name: "Canapé 3 places",
          formule_price: 79,
          options: [
            { name: "Traitement anti-acariens", price: 19 },
            { name: "Détachage intensif", price: 19 },
            { name: "Pouf supplémentaire", price: 21 }
          ]
        }
      ],
      start: "2026-08-20T10:00:00",
      end: "2026-08-20T11:30:00"
    },
    {
      client_name: "Test Auto",
      client_phone: "06 22 22 22 22",
      client_email: "test.auto@example.com",
      client_street: "2 Avenue de l'Auto",
      client_zip: "31200",
      client_city: "Toulouse",
      total_price: 129,
      items: [
        {
          service_id: "auto",
          service_name: "Nettoyage Auto",
          formule_name: "Pack Or",
          formule_price: 129,
          options: [
            { name: "Traitement anti-odeur", price: 15 },
            { name: "Nettoyage du ciel de toit", price: 29 }
          ]
        }
      ],
      start: "2026-08-20T14:00:00",
      end: "2026-08-20T16:00:00"
    },
    {
      client_name: "Test Tapis",
      client_phone: "06 33 33 33 33",
      client_email: "test.tapis@example.com",
      client_street: "3 Boulevard du Tapis",
      client_zip: "31300",
      client_city: "Toulouse",
      total_price: 139,
      items: [
        {
          service_id: "tapis",
          service_name: "Nettoyage Tapis",
          formule_name: "2 Tapis",
          formule_price: 79,
          options: [
            { name: "Nettoyage recto-verso", price: 25 },
            { name: "Détachage intensif", price: 19 }
          ]
        },
        {
          service_id: "matelas",
          service_name: "Nettoyage Matelas",
          formule_name: "Matelas 1 place",
          formule_price: 59,
          options: []
        }
      ],
      start: "2026-08-21T09:00:00",
      end: "2026-08-21T11:00:00"
    },
    {
      client_name: "Test Matelas",
      client_phone: "06 44 44 44 44",
      client_email: "test.matelas@example.com",
      client_street: "4 Impasse du Matelas",
      client_zip: "31400",
      client_city: "Toulouse",
      total_price: 118,
      items: [
        {
          service_id: "matelas",
          service_name: "Nettoyage Matelas",
          formule_name: "Matelas 2 places",
          formule_price: 99,
          options: [
            { name: "Traitement anti-acariens", price: 19 }
          ]
        }
      ],
      start: "2026-08-21T14:30:00",
      end: "2026-08-21T15:30:00"
    }
  ];

  for (const test of tests) {
    console.log(`Creating Test Event for ${test.client_name}...`);
    
    // Generate a valid fake token for the cancel page
    const firstItem = test.items[0];
    const summaryTitle = test.items.length > 1 ? `${firstItem.formule_name} + ${test.items.length - 1} autre(s)` : firstItem.formule_name;
    
    // Generate valid GCal ID (base32hex)
    const generateGcalId = () => {
      const chars = '0123456789abcdefghijklmnopqrstuv';
      let id = '';
      for (let i = 0; i < 32; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };
    const preGeneratedGcalId = generateGcalId();

    const totalDuration = test.items.reduce((sum, item) => sum + 60, 0); // Mock duration

    const shortTokenData = {
      i: preGeneratedGcalId,
      n: test.client_name.substring(0, 30),
      e: test.client_email,
      d: test.start.split("T")[0],
      t: test.start.split("T")[1].substring(0, 5),
      f: summaryTitle.substring(0, 30),
      dur: totalDuration
    };
    const validCancelToken = btoa(unescape(encodeURIComponent(JSON.stringify(shortTokenData))));
    const realCancelUrl = `https://www.cleanetfresh.fr/annuler?token=${validCancelToken}`;

    const desc = buildEventDescription({
      client_name: test.client_name,
      client_phone: test.client_phone,
      client_email: test.client_email,
      client_street: test.client_street,
      client_zip: test.client_zip,
      client_city: test.client_city,
      total_price: test.total_price,
      cancel_url: realCancelUrl,
      owner_phone: ownerPhone,
      items: test.items
    });

    const emoji = firstItem ? getEmoji(firstItem.service_id) : "🧹";

    await createCalendarEvent({
      id: preGeneratedGcalId,
      summary: `${emoji} ${summaryTitle} — ${test.client_name}`,
      description: desc,
      location: `${test.client_street}, ${test.client_zip} ${test.client_city}`,
      start: { dateTime: test.start, timeZone: "Europe/Paris" },
      end: { dateTime: test.end, timeZone: "Europe/Paris" }
    });
  }

  console.log("All Test Events created!");
}

main().catch(console.error);
