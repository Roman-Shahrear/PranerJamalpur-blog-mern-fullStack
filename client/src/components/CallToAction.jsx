import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to know about Praner Jamalpur projects?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with Official Praner Jamalpur Web application.
            </p>
            <Button gradientDuoTone="greenToBlue" className='rounded-tl-xl rounded-bl-none'>
                <a href="http://localhost:5173/projects" target='_blank' rel='noopener noreferrer'>
                    Praner Jamalpur
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://scontent.fzyl2-2.fna.fbcdn.net/v/t39.30808-6/423479575_1578291996045504_2440823958097944399_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=173fa1&_nc_ohc=e-tVwpVCpvUAX-TkqnT&_nc_ht=scontent.fzyl2-2.fna&oh=00_AfBDXLjFnGdaFVE7pHttE0S7KGYcKt0gzp6Q0PKzBJ47Vg&oe=65DEBF9D" />
        </div>
    </div>
  )
}