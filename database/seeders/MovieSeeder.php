<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creates 10 sample movies
        Movie::create([
            'title' => 'Inside Out 2',
            'description' => 'Teenager Rileys mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.',
            'release_date' => '2024-05-01',
            'genre' => 'Animation, Family, Drama, Adventure, Comedy',
            'image_url' => 'https://image.tmdb.org/t/p/w500//3aIrZuRyiGs9xDYHvMitHPFDd6r.jpg',
        ]);

        Movie::create([
            'title' => 'Civil War',
            'description' => 'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
            'release_date' => '2024-04-10',
            'genre' => 'War, Action, Drama',
            'image_url' => 'https://image.tmdb.org/t/p/w500//sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
        ]);

        Movie::create([
            'title' => 'Bad Boys: Ride or Die',
            'description' => 'After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.',
            'release_date' => '2024-06-5',
            'genre' => 'Action, Crime, Thriller, Comedy',
            'image_url' => 'https://image.tmdb.org/t/p/w500//nP6RliHjxsz4irTKsxe8FRhKZYl.jpg',
        ]);

        Movie::create([
            'title' => 'The Roundup: No Way Out',
            'description' => 'Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.',
            'release_date' => '2024-5-31',
            'genre' => 'Action, Crime, Comedy, Thriller',
            'image_url' => 'https://image.tmdb.org/t/p/w500//lW6IHrtaATxDKYVYoQGU5sh0OVm.jpg',
        ]);

        Movie::create([
            'title' => 'Fast & Furious: Final Lap',
            'description' => 'The last ride of the Fast & Furious saga, featuring epic races and high-stakes heists.',
            'release_date' => '2024-04-05',
            'genre' => 'Action',
            'image_url' => 'https://image.tmdb.org/t/p/w500//rdQrh59Gq0DX8OmoQeECUtBkoH5.jpg',
        ]);

        Movie::create([
            'title' => 'Tarot',
            'description' => 'When a group of friends recklessly violate the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.',
            'release_date' => '2024-05-01',
            'genre' => 'Horror',
            'image_url' => 'https://image.tmdb.org/t/p/w500//gAEUXC37vl1SnM7PXsHTF23I2vq.jpg',
        ]);
        Movie::create([
            'title' => 'Ultraman: Rising',
            'description' => 'With Tokyo under attack from kaiju, Ultraman discovers his greatest challenge isn’t fighting giant monsters - it’s raising one.',
            'release_date' => '2024-04-05',
            'genre' => 'Action',
            'image_url' => 'https://image.tmdb.org/t/p/w500//j886YEkIUsiImY53px5VHKD4lRa.jpg',
        ]);
        Movie::create([
            'title' => 'Furiosa: A Mad Max Saga',
            'description' => 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.',
            'release_date' => '2024-04-05',
            'genre' => 'Science Fiction',
            'image_url' => 'https://image.tmdb.org/t/p/w500//iADOJ8Zymht2JPMoy3R7xceZprc.jpg',
        ]);
        Movie::create([
            'title' => 'Thelma the Unicorn',
            'description' => 'Thelma dreams of being a glamorous unicorn. Then in a rare pink and glitter-filled moment of fate, Thelmas wish comes true. She rises to instant international stardom, but at an unexpected cost. After a while, Thelma realizes that she was happier as her ordinary, sparkle-free self. So she ditches her horn, scrubs off her sparkles, and returns home, where her best friend is waiting for her with a hug.',
            'release_date' => '2024-07-03',
            'genre' => 'Animation',
            'image_url' => 'https://image.tmdb.org/t/p/w500//yutiEZ7taGDNau2jGjKIdDwQpDw.jpg',
        ]);
        Movie::create([
            'title' => 'Cacau',
            'description' => 'Cacau is an engaging saga of family secrets, clandestine loves and sacrifices, all sweetened by the irresistible taste of chocolate and the magic of cocoa plantations.',
            'release_date' => '2024-03-05',
            'genre' => 'Action',
            'image_url' => 'https://image.tmdb.org/t/p/w500//nNCFBKZ68fmr008moWSzLdu2mUP.jpg',
        ]);
        Movie::create([
            'title' => 'Frieren: Beyond Journeys End',
            'description' => 'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
            'release_date' => '2023-09-29',
            'genre' => 'Drama',
            'image_url' => 'https://image.tmdb.org/t/p/w500//dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
        ]);
        Movie::create([
            'title' => 'Arcane',
            'description' => 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.',
            'release_date' => '2024-04-05',
            'genre' => 'Animation',
            'image_url' => 'https://image.tmdb.org/t/p/w500//fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
        ]);
        Movie::create([
            'title' => 'One Piece',
            'description' => 'Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates. Monkey D. Luffy, a boy who consumed a "Devil Fruit," decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that hes surrounded by a bevy of skilled fighters and thieves to help him along the way. Luffy will do anything to get the One Piece and become King of the Pirates!',
            'release_date' => '1999-10-20',
            'genre' => 'Action & Adventure',
            'image_url' => 'https://image.tmdb.org/t/p/w500//cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
        ]);
        Movie::create([
            'title' => 'Demon Slayer: Kimetsu no Yaiba',
            'description' => 'It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.',
            'release_date' => '2024-04-05',
            'genre' => 'Action',
            'image_url' => 'https://image.tmdb.org/t/p/w500//xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
        ]);
        Movie::create([
            'title' => 'Alchemy of Souls',
            'description' => 'A powerful sorceress in a blind womans body encounters a man from a prestigious family, who wants her help to change his destiny.',
            'release_date' => '2024-02-03',
            'genre' => 'Sci-Fi & Fantasy',
            'image_url' => 'https://image.tmdb.org/t/p/w500//q2IiPRSXPOZ6qVRj36WRAYEQyHs.jpg',
        ]);
    }
}
