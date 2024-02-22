import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with Official JavaScript documentation
            </p>
            <Button gradientDuoTone="greenToBlue" className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.devdocs.io/javascript" target='_blank' rel='noopener noreferrer'>
                    JavaScript
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://images.prismic.io/turing/652ec059fbd9a45bcec818e1_How_to_Use_Java_Script_for_Backend_Development_5889da971c.webp?auto=format%2Ccompress&fit=max&w=3840" />
        </div>
    </div>
  )
}