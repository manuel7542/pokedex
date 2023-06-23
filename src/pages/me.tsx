import { useSession } from "next-auth/react"
import Layout from "../app/layout"
import Header from "@/components/Header.component"
import Image from "next/image"

export default function MePage() {
  const { data: session } = useSession()

  return (
    <Layout>
      <Header />
      <div className="bg-gray-200 h-screen">
        <section className="relative block h-96">
          {session && (
            <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: `url('${(session?.user as any).banner}')`}}>
              <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
          )}
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: `translateX(${0}px) translateY(${0}%) translateZ(${0}px)`}}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-black fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        <section className="relative align-center justify-center flex flex-col h-auto">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white lg:bg-white lg:w-10/12 mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  {session && (
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <Image alt="..." src={((session?.user as any).avatar)} width={200} height={200} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                    </div>
                  )}
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="px-3 mt-32">
                      
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-black">22</span>
                        <span className="text-sm text-black">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-black">10</span>
                        <span className="text-sm text-black">Photos</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-black">89</span>
                        <span className="text-sm text-black">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4 lg:mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-black mb-2">
                    {session && (session?.user as any).name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-black"></i>
                    {session && (session?.user as any).address}
                  </div>
                  <div className="mb-2 text-black mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-black"></i>
                    {session && (session?.user as any).job} - {session && (session?.user as any).company}
                  </div>
                  <div className="mb-2 text-black">
                    <i className="fas fa-university mr-2 text-lg text-black"></i>
                    {session && (session?.user as any).school}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-black">
                        {session && (session?.user as any).about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}