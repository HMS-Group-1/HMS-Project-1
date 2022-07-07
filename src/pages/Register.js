import logo from '../assets/logobukabuku.png';

function Register() {
	return (
		<div className=" desktop:flex desktop:items-center desktop:h-screen desktop:justify-center pt-7">
			<div className="desktop:w-5/12 laptop: w-ful mobile:w-full tablet:w-full ">
				<div>
					<img className=" desktop:w-12/12 w-9/12 tablet:mx-12 tablet:my-2  mobile:mx-12 " src={logo} alt="logo" />
				</div>
				<figure className="tablet:mx-12 mobile:mx-12">
					<blockquote className="font-poppins font-semibold py-3 text-justify desktop:text-2xl desktop:leading-loose  tablet:text-xl tablet:my-2  tablet:w-full mobile:text-base">
						Buku adalah pembawa peradaban. Tanpa buku, sejarah itu sunyi, sastra itu bodoh, sains lumpuh, pemikiran dan spekulasi terhenti. Buku adalah mesin perubahan, jendela, di dunia, mercusuar yang didirikan di lautan waktu
					</blockquote>
					<figcaption className="font-poppins font-semibold desktop:text-2xl tablet:text-xl tablet:pb-5 mobile:text-base"> -Barbara W.Tuchman</figcaption>
				</figure>
			</div>

			<div className="bg-red-50 flex justify-start flex-col rounded-md font-poppins  mobile:mx-12 mobile:my-5 mobile:px-5 mobile:items-center mobile:pb-8  ">
				<h3 className=" font-semibold w-11/12 tablet:w-full tablet:pl-3 tablet:text-2xl mobile:pt-8  mobile:text-xl  mobile:w-11/12">Selamat Datang,</h3>
				<h5 className="w-11/12 pt-0 pb-4 tablet:w-full tablet:pl-3 tablet:pt-1 tablet:text-base mobile:w-11/12 mobile:text-sm">Masuk dengan akunmu dulu ya!</h5>
				<form className="flex flex-col w-full mobile:px-3">
					<label className="pb-2" for="nama">
						Nama
					</label>
					<input class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " id="nama" type="text" placeholder="Masukkan Nama" />
					<label className="pb-2" for="Email">
						Email
					</label>
					<input class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " id="Email" type="email" placeholder="Masukkan Nama" />
					<label className="pb-2" for="password">
						Password
					</label>
					<input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " id="password" type="password" placeholder="******************" />
					<label className="pb-2" for="no_telp">
						Nomor Telepon
					</label>
					<input class=" appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="no_telp" type="text" placeholder="08xxxxxxxx" />
					<div class="items-center justify-between pt-4 tablet:flex tablet:flex-col mobile:flex mobile:flex-col">
						<button class="bg-yellow-200 text-black w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline tablet:pt-3" type="button">
							masuk
						</button>
						<p class="inline-block align-baseline font-bold text-sm text-blue-500 tablet:pt-2 ">Sudah punya akun? Masuk di sini</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
