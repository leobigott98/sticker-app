import Image from 'next/image';
import { Asset } from '../lib/definitions';

export default function SideBar({ assets } : { assets : Asset[] | null} ) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {assets?.map((asset) => {
            return (
                <Image key={asset.path} src={asset.path} alt={asset.alt} width={500} height={500}/>
            )
        })}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
