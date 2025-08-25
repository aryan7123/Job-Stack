'use client';

import { RootState } from '@/app/store';
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails } from '@/app/store/features/employers/employerProfile';
import Link from 'next/link';
import Image from 'next/image';

const page = () => {
  const [employerId, setEmployerId] = useState<string>("");

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { employer, error, loading } = useSelector(
    (state: RootState) => state.employerProfile
  );

  useEffect(() => {
    if (session?.user?.id) {
      setEmployerId(session.user.id);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (!employerId) return;
    dispatch(fetchProfileDetails(employerId));
  }, [employerId, dispatch]);

  return (
    <>
      <Navbar />

      <section className={`relative w-full py-24 bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${employer?.photos[0]})` }}>
        <div className="absolute inset-0 bg-emerald-900/80 z-0"></div>
        <div className="relative z-10 px-5 sm:px-6 lg:px-8">
          <div className='max-w-6xl mx-auto flex items-center justify-between bg-white rounded-md p-6 shadow-sm shadow-gray-200'>
            <div className="flex items-center gap-4">
              <Image
                className='shadow-sm rounded-md shadow-gray-200 bg-slate-50 p-3'
                src={employer?.companyLogo}
                alt={employer?.name}
                width={100}
                height={100}
                quality={100}
                priority
              />
              <div className="flex flex-col justify-start gap-2">
                <h3 className='text-xl font-bold'>{employer?.name}</h3>
                <div className='flex items-center'>
                  <svg stroke="currentColor" fill="#90a1b9" strokeWidth="0" viewBox="0 0 256 256" className="me-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path></svg>
                  <span className='text-slate-400'>{employer?.headquarters}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='relative w-full'>
        <div className='max-w-6xl mx-auto md:px-0 px-5 mt-14'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo unde, error corporis hic praesentium aliquid, nobis consequuntur ipsa minima alias quo. Dicta nulla quidem quisquam repellendus expedita ut libero quaerat illo voluptatibus, ad id sapiente quis, maiores esse est debitis assumenda enim cumque sint. Magnam sit repellendus rerum alias reprehenderit odit ratione aliquam voluptatum ut inventore minus laborum repellat aspernatur, vitae ipsam natus sunt officiis delectus, accusantium vero placeat debitis. Cum, magnam voluptatum ad, dolores laudantium harum minus, distinctio velit eveniet ullam accusantium? Excepturi ipsam voluptatibus non delectus ducimus perferendis. Corporis odit consequatur delectus et dolor magni harum maiores blanditiis saepe, perspiciatis illo nam placeat, optio quod veniam porro aliquid explicabo, facilis non sit modi iusto! Odit ipsa possimus cupiditate eos ipsam numquam reiciendis ratione natus quos, laborum reprehenderit asperiores facilis deserunt modi iste libero, quas odio nihil ea inventore eveniet praesentium repudiandae, commodi aliquid! Quia libero ipsa minima praesentium consectetur possimus iusto soluta aspernatur quas maiores dolorem nulla iste magnam laboriosam quos fuga hic veniam explicabo est, porro omnis? Corrupti animi cumque expedita repudiandae necessitatibus eius facere, reprehenderit, quisquam quidem ut perferendis commodi in eveniet dolore deserunt pariatur minima nemo voluptates fugit sunt. Exercitationem corporis iusto porro laborum velit, culpa officia molestiae doloremque animi dolor, sed tempore mollitia. Consequatur praesentium temporibus labore ex, quasi placeat ut rem nam assumenda delectus esse hic quod fugiat, unde enim cum sequi facilis dolores magnam quidem incidunt libero? Quia iste quae debitis, necessitatibus quibusdam velit fugit sapiente accusantium, natus doloribus a? Repellendus delectus nesciunt fuga itaque recusandae cumque iusto praesentium, rem obcaecati quisquam laudantium dolorem nam ab, necessitatibus suscipit eum natus inventore tempora repellat quod exercitationem. Maiores unde quam consequatur debitis deleniti consequuntur reprehenderit dolor, totam voluptatum animi error rerum iusto ullam similique quasi praesentium qui. Nulla exercitationem animi ea deserunt iure eaque. Eos suscipit nisi placeat molestias, quod asperiores soluta dolor dolorum cum distinctio, quaerat nobis iure temporibus sint doloremque illum pariatur laborum consequatur commodi rem consectetur obcaecati odit eaque quasi. Cum magni, quas explicabo earum, ratione vitae, repudiandae esse soluta rem ad officiis cupiditate deleniti aperiam sapiente ipsam. Inventore consequatur incidunt exercitationem qui ducimus id asperiores eaque eos, velit, perspiciatis cumque neque quas quia consectetur in quae fugit quisquam ullam natus omnis! Vitae facilis atque consectetur id, vero aspernatur numquam magnam repellendus voluptatibus! Dolore porro asperiores modi assumenda illo distinctio facere eos ab cum voluptatibus recusandae, voluptates dolorum perferendis magni enim veritatis incidunt saepe, laudantium iure culpa totam ut id expedita at. Reprehenderit tempore perferendis ea eos laudantium maxime dignissimos possimus eligendi nostrum dolores, eveniet ullam, maiores eius itaque magni, et fuga dolorum rerum. Quibusdam necessitatibus autem ut exercitationem corrupti, ipsa consectetur officiis vel natus ullam beatae laboriosam ipsam debitis cum omnis sint, voluptatem porro a quasi. Aliquid possimus ut, fuga dignissimos libero sequi molestias laudantium dicta sapiente veritatis modi quae dolor eos sit necessitatibus doloremque alias totam voluptatem adipisci doloribus fugiat nostrum eum rerum nobis. Quisquam exercitationem error eius repellat, accusamus consequatur dolores obcaecati consequuntur eos vitae? Animi accusamus nam sunt architecto minus sequi neque voluptatem! Laudantium cum atque consectetur placeat optio iste eius dolorum a iure numquam. Non veniam iste eos! Veritatis deleniti perspiciatis commodi perferendis, doloribus, consectetur recusandae aliquid earum officiis nihil maxime aut. Quis facere saepe tempore quo adipisci temporibus labore fugit eos, provident repellat numquam accusamus aperiam, nam voluptates cum autem! Aspernatur ex perspiciatis sapiente? Iusto, consequatur repellendus ratione soluta rerum corporis architecto fugiat atque? Modi tempore iusto nobis sint necessitatibus accusamus accusantium dolores mollitia architecto nisi doloribus distinctio exercitationem dolorum, perspiciatis corrupti similique id quis pariatur asperiores perferendis quam cum magnam minima. Vitae distinctio perferendis, aut id excepturi iste illum ducimus? Doloribus distinctio rem cupiditate modi natus. Reprehenderit, animi blanditiis unde impedit voluptas, consequatur rem iure eius atque sunt asperiores ex dolor ratione et at. Quas optio, voluptas suscipit nesciunt doloremque ut quisquam sint voluptatum sunt. Ipsam provident ratione debitis quo nihil architecto eligendi optio officiis earum temporibus at officia minima harum maiores adipisci illo, porro commodi mollitia consectetur in qui rem dignissimos possimus. Nisi, beatae? Autem sapiente culpa nobis. Commodi, voluptas! Sed voluptatem labore vel ea! Ex illum aliquid, obcaecati in odit, quaerat nihil fugiat ipsam quo veritatis voluptatibus unde totam nostrum. Odio, ratione officiis id accusantium dolor aut numquam molestiae dolores blanditiis consequatur mollitia ex voluptatibus reprehenderit, ut accusamus voluptatum nesciunt commodi at iusto eum! Omnis reprehenderit ratione enim hic non quo suscipit quos consequuntur consequatur, delectus alias dolore repellendus maxime expedita cupiditate odit, ut itaque cum earum sequi rerum. Temporibus impedit cum neque odio voluptas dolore voluptates provident doloribus fugit similique? Eaque magnam, omnis dolor quam commodi saepe exercitationem cum. Incidunt repellendus maiores rem odio provident vitae libero ut veniam facere voluptatibus eligendi quis, expedita sapiente earum obcaecati, nostrum iste nisi corrupti unde amet fuga. Voluptates sapiente aut aperiam reiciendis labore nulla aliquam nihil consequuntur autem? Eum adipisci explicabo ipsa beatae assumenda quam distinctio earum sunt nemo ex debitis expedita perspiciatis, odio quidem quas nesciunt ipsum eos neque atque dignissimos tempore. Placeat vero eligendi dolorum autem eaque excepturi nesciunt, soluta iusto neque sed et laudantium praesentium, molestiae distinctio numquam. Dolorem facilis ducimus exercitationem officiis tenetur amet necessitatibus architecto earum veritatis consequatur id itaque numquam dicta ipsum nesciunt delectus fugit, ab facere odit dolorum modi odio quasi! Optio ex provident harum illum, laboriosam officia pariatur assumenda, ipsam asperiores reiciendis fugit nulla, voluptate unde? Dignissimos officiis ipsam beatae quidem neque, et quis nemo ullam consequuntur? Dolorem dolores dicta architecto deleniti non a eaque dolor iste porro et. Nesciunt, iure distinctio enim ratione explicabo neque vel nam quibusdam, odit delectus maiores, iusto placeat temporibus sunt labore eligendi sit ut quasi et inventore eius quos nihil a? Labore voluptatem blanditiis nesciunt sequi eos suscipit quisquam laborum sunt enim exercitationem incidunt officiis libero minima aspernatur, autem unde tempora nobis quae explicabo. Natus laudantium praesentium vero doloremque eos libero labore. Accusamus debitis dolores beatae esse consequatur voluptatibus a eveniet possimus repudiandae fugit quod autem necessitatibus iste dolorum repellat rerum nam molestiae doloremque vitae, illum excepturi vel temporibus minus?
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page
