import { ROUTES } from '../../constants/routes';

interface TestimonialCardProps {
  image: string;
  name: string;
  location: string;
  text: string;
}

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

const HeroSection = () => (
  <div className="gradient-bg text-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
      Intercambia favores con tus vecinos
    </h1>
    <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
      Una comunidad donde ayudar a los demás te hace ganar puntos para recibir ayuda a cambio.
    </p>
    <div className="mt-10 flex justify-center space-x-4">
      <a href={ROUTES.SIGN_UP} className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50">Comenzar</a>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-8 rounded-xl shadow-md feature-card">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    <h3 className="mt-6 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-500">{description}</p>
  </div>
);

const FeaturesSection = () => (
  <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">¿Cómo funciona AyudaVecino?</h2>
    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
      Un proceso simple de tres pasos para conectar con tu comunidad
    </p>
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard icon="fa-user-plus" title="Crea una cuenta" description="Regístrate y verifica tu perfil para unirte a tu comunidad local de ayudantes." />
      <FeatureCard icon="fa-tasks" title="Solicita u ofrece ayuda" description="Publica favores que necesitas o servicios que puedes ofrecer para ganar puntos." />
      <FeatureCard icon="fa-exchange-alt" title="Intercambia y gana" description="Completa favores para ganar puntos que puedes canjear cuando necesites ayuda." />
    </div>
  </div>
);

const TestimonialCard = ({ image, name, location, text }:TestimonialCardProps ) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <img className="h-10 w-10 rounded-full" src={image} alt={name} />
      <div className="ml-4">
        <h4 className="text-sm font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
    <p className="mt-4 text-gray-600">"{text}"</p>
  </div>
);

const TestimonialsSection = () => (
  <div className="bg-indigo-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Lo que dice nuestra comunidad</h2>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard image="https://randomuser.me/api/portraits/women/42.jpg" name="Sarah J." location="Portland, OR" text="He recibido mucha ayuda con mi jardín y a cambio he ayudado a otros con el cuidado de mascotas. ¡Ha cambiado la forma en que interactúo con mis vecinos!" />
        <TestimonialCard image="https://randomuser.me/api/portraits/men/32.jpg" name="Michael T." location="Austin, TX" text="Como manitas, he ganado suficientes puntos para obtener tutorías gratuitas para mis hijos. El sistema funciona perfectamente para nuestra familia." />
        <TestimonialCard image="https://randomuser.me/api/portraits/women/68.jpg" name="Priya K." location="Chicago, IL" text="Siendo nueva en la ciudad, AyudaVecino me ayudó a conocer gente increíble mientras recibía ayuda con la mudanza y adaptación." />
      </div>
    </div>
  </div>
);

const CTASection = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-indigo-700 rounded-lg shadow-xl lg:grid lg:grid-cols-2">
        <div className="p-10 sm:p-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">¿Listo para unirte? Comienza a intercambiar favores hoy.</h2>
          <p className="mt-4 text-lg text-indigo-200">Regístrate ahora y obtén 50 puntos de bonificación para comenzar tu viaje de intercambio de favores.</p>
          <a href={ROUTES.SIGN_UP} className="mt-8 bg-white text-indigo-600 font-medium rounded-md px-5 py-3 inline-flex items-center hover:bg-indigo-50">Regístrate gratis</a>
        </div>
        <img className="rounded-md object-cover" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1184&q=80" alt="Personas ayudándose mutuamente" />
      </div>
    </div>
  </div>
);

const HomePage = () => (
  <div className="bg-gray-50 font-sans">
    <HeroSection />
    <FeaturesSection />
    <TestimonialsSection />
    <CTASection />
  </div>
);

export default HomePage;
