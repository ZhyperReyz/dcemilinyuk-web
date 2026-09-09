<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['id'=>'et1','name'=>'Es Teh Manis','category_id'=>'esteh','price'=>5000,'image'=>'img/esteh.png','description'=>'Es teh manis klasik yang menyegarkan, dibuat dari teh pilihan.','rating'=>4.8,'sold'=>1250,'badge'=>'Populer'],
            ['id'=>'et2','name'=>'Es Teh Tarik','category_id'=>'esteh','price'=>8000,'image'=>'img/esteh.png','description'=>'Es teh tarik dengan susu kental manis, creamy dan nikmat.','rating'=>4.7,'sold'=>980,'badge'=>''],
            ['id'=>'et3','name'=>'Es Teh Lemon','category_id'=>'esteh','price'=>7000,'image'=>'img/esteh.png','description'=>'Perpaduan teh segar dengan perasan lemon asli.','rating'=>4.6,'sold'=>756,'badge'=>'Baru'],
            ['id'=>'et4','name'=>'Es Teh Susu','category_id'=>'esteh','price'=>8000,'image'=>'img/esteh.png','description'=>'Es teh premium dengan campuran susu segar.','rating'=>4.9,'sold'=>1100,'badge'=>''],
            ['id'=>'pi1','name'=>'Pop Ice Mangga','category_id'=>'popice','price'=>5000,'image'=>'img/popice.png','description'=>'Pop Ice rasa mangga yang manis dan menyegarkan.','rating'=>4.5,'sold'=>890,'badge'=>''],
            ['id'=>'pi2','name'=>'Pop Ice Anggur','category_id'=>'popice','price'=>5000,'image'=>'img/popice.png','description'=>'Pop Ice rasa anggur favorit semua kalangan.','rating'=>4.4,'sold'=>720,'badge'=>''],
            ['id'=>'pi3','name'=>'Pop Ice Strawberry','category_id'=>'popice','price'=>6000,'image'=>'img/popice.png','description'=>'Pop Ice strawberry dengan rasa buah segar.','rating'=>4.6,'sold'=>650,'badge'=>'Populer'],
            ['id'=>'pi4','name'=>'Pop Ice Coklat','category_id'=>'popice','price'=>6000,'image'=>'img/popice.png','description'=>'Pop Ice coklat yang creamy dan lezat.','rating'=>4.3,'sold'=>580,'badge'=>''],
            ['id'=>'ic1','name'=>'Es cemil','category_id'=>'icecream','price'=>5000,'image'=>'img/escemil.jpeg','description'=>'Es cemil lezat dengan aneka topping.','rating'=>4.9,'sold'=>1500,'badge'=>'Best Seller','variants'=>json_encode([['name'=>'Porsi Kecil','price'=>5000,'label'=>'5k'],['name'=>'Porsi Besar','price'=>10000,'label'=>'10k']])],
            ['id'=>'ic2','name'=>'Es cemil Coklat','category_id'=>'icecream','price'=>10000,'image'=>'img/escemil.jpeg','description'=>'Es cemil dengan topping coklat Belgian yang kaya rasa.','rating'=>4.7,'sold'=>1320,'badge'=>''],
            ['id'=>'ic3','name'=>'Es cemil Strawberry','category_id'=>'icecream','price'=>10000,'image'=>'img/escemil.jpeg','description'=>'Es cemil dengan topping strawberry segar.','rating'=>4.9,'sold'=>980,'badge'=>'Baru'],
            ['id'=>'bl1','name'=>'Bolen Pisang','category_id'=>'bolen','price'=>5000,'image'=>'img/bolen.png','description'=>'Bolen pisang renyah dengan isian pisang manis.','rating'=>4.7,'sold'=>2100,'badge'=>'Best Seller'],
            ['id'=>'bl2','name'=>'Bolen Keju','category_id'=>'bolen','price'=>7000,'image'=>'img/bolen.png','description'=>'Bolen keju dengan lelehan keju yang gurih.','rating'=>4.6,'sold'=>1800,'badge'=>''],
            ['id'=>'bl3','name'=>'Bolen Coklat','category_id'=>'bolen','price'=>7000,'image'=>'img/bolen.png','description'=>'Bolen dengan isian coklat leleh yang nikmat.','rating'=>4.8,'sold'=>1650,'badge'=>'Populer'],
            ['id'=>'bl4','name'=>'Bolen Pisang Coklat','category_id'=>'bolen','price'=>8000,'image'=>'img/bolen.png','description'=>'Kombinasi pisang dan coklat dalam pastry renyah.','rating'=>4.9,'sold'=>1400,'badge'=>''],
            ['id'=>'mb1','name'=>'Nasi Ayam Bakar','category_id'=>'makberat','price'=>15000,'image'=>'img/nasiayam1.jpeg','description'=>'Nasi ayam bakar hemat, gurih dan lezat dengan sambal spesial.','rating'=>4.8,'sold'=>320,'badge'=>'Populer'],
            ['id'=>'mb2','name'=>'Nasi Kotak Ayam Bakar','category_id'=>'makberat','price'=>20000,'image'=>'img/nasiayam2.jpeg','description'=>'Nasi kotak ayam bakar lengkap dengan lauk dan sayur.','rating'=>4.7,'sold'=>210,'badge'=>''],
            ['id'=>'mb3','name'=>'Burger Sapi/Ayam','category_id'=>'makberat','price'=>15000,'image'=>'img/burger.jpeg','description'=>'Burger juicy pilihan daging sapi atau ayam, saus spesial.','rating'=>4.6,'sold'=>185,'badge'=>''],
            ['id'=>'mb4','name'=>'Kebab Sapi','category_id'=>'makberat','price'=>12000,'image'=>'img/kebab.jpeg','description'=>'Kebab sapi dengan sayuran segar dan saus mayonaise pedas.','rating'=>4.5,'sold'=>160,'badge'=>''],
            ['id'=>'mb5','name'=>'Mie Geprek Katsu','category_id'=>'makberat','price'=>15000,'image'=>'img/miegeprek.jpeg','description'=>'Mie geprek dengan katsu ayam crispy dan sambal geprek pedas.','rating'=>4.7,'sold'=>140,'badge'=>'Baru'],
            ['id'=>'mb6','name'=>'Seblak Rafael','category_id'=>'makberat','price'=>12000,'image'=>'img/seblak.jpeg','description'=>'Seblak khas Rafael, pedas gurih dengan aneka topping.','rating'=>4.6,'sold'=>130,'badge'=>''],
            ['id'=>'mb7','name'=>'Martabak Kulit Lumpia','category_id'=>'makberat','price'=>10000,'image'=>'img/martabak.jpeg','description'=>'Martabak telur renyah dengan kulit lumpia tipis, gurih nikmat.','rating'=>4.8,'sold'=>200,'badge'=>'Populer'],
            ['id'=>'kd1','name'=>'Bolu Original','category_id'=>'kuedessert','price'=>20000,'image'=>'img/bolu.jpeg','description'=>'Bolu lembut dan harum, cocok untuk camilan atau hadiah.','rating'=>4.7,'sold'=>310,'badge'=>''],
            ['id'=>'kd2','name'=>'Bolu Potong','category_id'=>'kuedessert','price'=>10000,'image'=>'img/bolupotong.jpeg','description'=>'Bolu potong lembut tersedia per slice.','rating'=>4.6,'sold'=>280,'badge'=>''],
            ['id'=>'kd3','name'=>'Bolu Tape Keju 22cm','category_id'=>'kuedessert','price'=>45000,'image'=>'img/bolupotong2.jpeg','description'=>'Bolu tape keju 22cm, perpaduan tape yang legit dengan keju asin.','rating'=>4.9,'sold'=>150,'badge'=>'Populer'],
            ['id'=>'kd4','name'=>'Brownis Choco Chip','category_id'=>'kuedessert','price'=>35000,'image'=>'img/brownis1.jpeg','description'=>'Brownis choco chip ukuran 20x20, coklat pekat dan moist.','rating'=>4.8,'sold'=>210,'badge'=>'Best Seller'],
            ['id'=>'kd5','name'=>'Brownis Choco Chip Mini','category_id'=>'kuedessert','price'=>25000,'image'=>'img/brownis2.jpeg','description'=>'Brownis choco chip ukuran 20x10.','rating'=>4.7,'sold'=>190,'badge'=>''],
            ['id'=>'kd6','name'=>'Brownis Hias','category_id'=>'kuedessert','price'=>50000,'image'=>'img/brownishias.jpeg','description'=>'Brownis cantik dengan hiasan premium, cocok untuk kado & hampers.','rating'=>4.9,'sold'=>120,'badge'=>'Baru'],
            ['id'=>'kd7','name'=>'Brownis Choco Cheese','category_id'=>'kuedessert','price'=>40000,'image'=>'img/brownischeese.jpeg','description'=>'Brownis choco cheese tuty fruity, manis asam yang unik.','rating'=>4.8,'sold'=>140,'badge'=>''],
            ['id'=>'kd8','name'=>'Bolen Pisang Keju','category_id'=>'kuedessert','price'=>7000,'image'=>'img/bolenpisangkeju.jpeg','description'=>'Bolen pisang keju renyah dengan kombinasi manis dan gurih.','rating'=>4.8,'sold'=>560,'badge'=>'Populer'],
            ['id'=>'sn1','name'=>'Kentang Goreng','category_id'=>'snack','price'=>8000,'image'=>'img/kentanggoreng.jpeg','description'=>'Kentang goreng crispy, renyah di luar lembut di dalam.','rating'=>4.5,'sold'=>430,'badge'=>''],
            ['id'=>'sn2','name'=>'Sosis Bakar','category_id'=>'snack','price'=>8000,'image'=>'img/sosisbakar.jpeg','description'=>'Sosis bakar juicy dengan bumbu spesial.','rating'=>4.6,'sold'=>390,'badge'=>''],
            ['id'=>'sn3','name'=>'Pisang Goreng Madu','category_id'=>'snack','price'=>7000,'image'=>'img/pisanggoreng.jpeg','description'=>'Pisang goreng madu crispy manis.','rating'=>4.7,'sold'=>510,'badge'=>'Populer'],
            ['id'=>'sn4','name'=>'Cireng Salju','category_id'=>'snack','price'=>8000,'image'=>'img/cirengSalju.jpeg','description'=>'Cireng salju crispy dengan bumbu balado atau keju.','rating'=>4.6,'sold'=>340,'badge'=>''],
            ['id'=>'sn5','name'=>'Jasuke','category_id'=>'snack','price'=>8000,'image'=>'img/jasuke.jpeg','description'=>'Jagung susu keju, manis gurih creamy.','rating'=>4.5,'sold'=>270,'badge'=>''],
            ['id'=>'sn6','name'=>'Gabin Fla','category_id'=>'snack','price'=>8000,'image'=>'img/gabinfla.jpeg','description'=>'Gabin berisi fla creamy lembut.','rating'=>4.7,'sold'=>300,'badge'=>'Baru'],
            ['id'=>'sn7','name'=>'Risolles','category_id'=>'snack','price'=>5000,'image'=>'img/risolles.jpeg','description'=>'Risolles kulit tipis dengan isian ragout ayam.','rating'=>4.8,'sold'=>480,'badge'=>'Populer'],
            ['id'=>'sn8','name'=>'Sambal Geprek','category_id'=>'snack','price'=>5000,'image'=>'img/sambalgeprek.jpeg','description'=>'Sambal geprek pedas nikmat.','rating'=>4.5,'sold'=>220,'badge'=>''],
            ['id'=>'hp1','name'=>'Hampers Ayam Bakar','category_id'=>'hampers','price'=>75000,'image'=>'img/hampers.jpeg','description'=>'Paket hampers ayam bakar lengkap.','rating'=>4.9,'sold'=>85,'badge'=>'Best Seller'],
            ['id'=>'hp2','name'=>'Hampers Ayam Bakar Eksklusif','category_id'=>'hampers','price'=>95000,'image'=>'img/hampersayam2.jpeg','description'=>'Hampers ayam bakar eksklusif dengan packaging premium.','rating'=>4.8,'sold'=>60,'badge'=>''],
            ['id'=>'hp3','name'=>'Hampers Urap Sayur','category_id'=>'hampers','price'=>65000,'image'=>'img/hampersUrap.jpeg','description'=>'Paket hampers urap sayur segar.','rating'=>4.7,'sold'=>45,'badge'=>'Baru'],

            // ── Produk Terlaris Tambahan ──────────────────────
            ['id'=>'ts1','name'=>'Es Teh Jeruk','category_id'=>'esteh','price'=>7000,'image'=>'img/esteh.png','description'=>'Perpaduan teh segar dan jeruk peras, cocok untuk cuaca panas.','rating'=>4.8,'sold'=>1850,'badge'=>'Best Seller'],
            ['id'=>'ts2','name'=>'Bolen Keju Spesial','category_id'=>'bolen','price'=>8000,'image'=>'img/bolen.png','description'=>'Bolen keju spesial dengan double keju mozarella yang meleleh.','rating'=>4.9,'sold'=>1950,'badge'=>'Best Seller'],
            ['id'=>'ts3','name'=>'Es Cemil Matcha','category_id'=>'icecream','price'=>12000,'image'=>'img/escemil.jpeg','description'=>'Es cemil rasa matcha premium dengan topping mochi.','rating'=>4.8,'sold'=>1100,'badge'=>'Populer'],
            ['id'=>'ts4','name':'Nasi Ayam Geprek','category_id'=>'makberat','price'=>15000,'image'=>'img/miegeprek.jpeg','description'=>'Nasi ayam geprek crispy dengan sambal pedas level 3-5.','rating'=>4.7,'sold'=>980,'badge'=>''],
            ['id'=>'ts5','name':'Pop Ice Alpukat','category_id'=>'popice','price'=>6000,'image'=>'img/popice.png','description'=>'Pop Ice rasa alpukat creamy, favorit semua kalangan.','rating'=>4.6,'sold'=>1050,'badge'=>''],
            ['id'=>'ts6','name':'Brownis Keju Premium','category_id'=>'kuedessert','price'=>45000,'image'=>'img/brownischeese.jpeg','description'=>'Brownis keju premium ukuran besar, lembut dan cheesy.','rating'=>4.9,'sold'=>1750,'badge'=>'Best Seller'],
        ];

        foreach ($products as $p) {
            Product::updateOrCreate(['id' => $p['id']], $p);
        }
    }
}
