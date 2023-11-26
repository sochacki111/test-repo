export const fetchPolygons = async () => {
  try {
    const response = await fetch('http://localhost:8000/land_use_plans/all');
    return await response.json();
  } catch (error) {
    // Mocked data in case we couldn't fetch polygons from the API
    console.error('Error fetching polygons:', error);
    return [
      {
        id: 100,
        name: 'Fabryka Hager',
        description:
          'Fabryka została zbudowana na terenach zielonych przy ulicy Turyńskiej. Należy zaznaczyć, że w przyszłym roku kolejna część zielonych obszarów zostanie zabudowana przez innego inwestora.',
        date: '2023-11-26',
        coordinates: [
          {
            lat: 50.09374572112422,
            lng: 19.107295274734497,
          },
          {
            lat: 50.09451660043461,
            lng: 19.106984138488773,
          },
          {
            lat: 50.095008717794315,
            lng: 19.107509851455692,
          },
          {
            lat: 50.094162135149055,
            lng: 19.10842716693878,
          },
          {
            lat: 50.09403480231895,
            lng: 19.108411073684696,
          },
        ],
        comments: [
          {
            id: 1,
            text: 'Mam mieszane uczucia co do nowej fabryki, ale z drugiej strony, widząc, jak inwestycje przyciągają nowe firmy, mam nadzieję, że przyniesie to dobre miejsca pracy i rozwój naszej okolicy. Jednak zastanawiam się, czy plany zabudowy kolejnej części terenów zielonych są konieczne.',
          },
          {
            id: 2,
            text: 'To dla mnie smutne, że zielone obszary są zabudowywane. Rozumiem, że nowe inwestycje są ważne dla rozwoju miasta, ale mam obawy co do utrzymania równowagi między rozwojem a ochroną środowiska. Mam nadzieję, że nowy inwestor podejmie kroki w celu minimalizacji wpływu na nasze naturalne otoczenie.',
          },
          {
            id: 3,
            text: 'Super, że nasze miasto rozwija się! Fabryka Hager to świetna inwestycja, a plany kolejnego inwestora na zagospodarowanie zielonych obszarów brzmią obiecująco. To oznacza nowe miejsca pracy i szansę na jeszcze lepsze warunki życia dla nas wszystkich!',
          },
          {
            id: 4,
            text: 'Zbudowanie nowej fabryki to z pewnością krok w przód dla gospodarki lokalnej, ale mam obawy co do infrastruktury. Czy miasto planuje dostosować się do wzrostu ruchu i zapewnić odpowiednie udogodnienia dla mieszkańców? Liczę na to, że wszelkie zmiany będą przemyślane.',
          },
          {
            id: 5,
            text: 'To smutne, że kolejne zielone obszary zostaną zabudowane. Miałam nadzieję, że miasto będzie bardziej dbać o nasze otoczenie naturalne. Teraz zastanawiam się, jak to wpłynie na naszą jakość życia i lokalny ekosystem.',
          },
        ],
      },
      {
        coordinates: [
          {
            lat: 50.12255922375676,
            lng: 19.077930450439457,
          },
          {
            lat: 50.1227793437842,
            lng: 19.060420989990238,
          },
          {
            lat: 50.12707148200493,
            lng: 19.07037734985352,
          },
        ],
        id: 1,
        name: 'Inspiria Tower',
        description:
          '"Inspiria Tower" to nowoczesny wieżowiec o unikalnej architekturze, wznoszący się ponad panoramę miasta. Jego dynamiczna fasada, zastosowanie innowacyjnych materiałów i zrównoważonej technologii czynią go wyjątkowym punktem odniesienia w krajobrazie miejskim.',
        date: '2022-01-01',
        comments: [
          { id: 1, text: 'nie podoba mi się ta inwestycja ~ Władek' },
          { id: 2, text: 'świetny pomysł! ~ Magda' },
          {
            id: 3,
            text: 'Jestem trochę zaniepokojony wielkością tego budynku. Czy była przeprowadzona analiza wpływu na środowisko? Mam nadzieję, że zadbano o ekologiczne aspekty podczas budowy. ~ Krzysztof',
          },
          {
            id: 4,
            text: 'Bardzo podoba mi się nowy budynek! Ma nowoczesny wygląd, ale jednocześnie doskonale komponuje się z otoczeniem. To zdecydowanie korzystny dodatek dla naszej społeczności. ~ Ania',
          },
          // Nowe komentarze
          {
            id: 5,
            text: 'Budynek jest imponujący! Architektura jest świetnie zaprojektowana, a wykonanie doskonałe. To naprawdę podniosło estetykę naszego otoczenia. ~ Tomek',
          },
          {
            id: 6,
            text: 'Jestem pod wrażeniem, jak szybko udało się zbudować ten budynek. To świetny przykład efektywnej pracy zespołu budowlanego. ~ Kasia',
          },
          {
            id: 7,
            text: 'Cieszę się, że w końcu zdecydowano się zbudować coś na tym miejscu. To było nieużywane przez wiele lat, a teraz mamy nowy, użyteczny obiekt. To zdecydowanie krok w dobrym kierunku. ~ Michał',
          },
          {
            id: 8,
            text: 'Zbudowanie tego budynku zdecydowanie poprawiło infrastrukturę w tej okolicy. Teraz mamy lepsze miejsca do pracy i życia, co zdecydowanie wpływa na jakość naszego codziennego życia. ~ Monika',
          },
          {
            id: 8,
            text: 'Szanowni Mieszkańcy, Zgodność z Planem Zagospodarowania Przestrzennego: Projekt budynku został dokładnie przemyślany i dostosowany do obowiązującego Planu Zagospodarowania Przestrzennego. Dbamy o to, aby nowe struktury harmonijnie wpisywały się w istniejący krajobraz urbanistyczny. Z poważaniem, Urząd Miasta Bierunia',
          },
        ],
      },

    ];
  }
};

export const createPolygon = async (polygonData) => {
  try {
    console.log('polygonData', polygonData);
    const response = await fetch(
      'http://localhost:8000/land_use_plans/create',
      {
        method: 'POST',
        body: JSON.stringify(polygonData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.error('Error creating polygon:', error);
  }
};

export const createComment = async (commentData) => {
  try {
    console.log('commentData', commentData);
    console.log('JSON.stringify(text)', JSON.stringify(commentData));
    const response = await fetch('http://localhost:8000/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};
