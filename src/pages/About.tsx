import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Target, Award, Users, TrendingUp, Shield, Heart, Home } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  
  const stats = [
    {
      icon: Home,
      value: "500+",
      label: "Properties Sold",
      description: "Successfully completed transactions"
    },
    {
      icon: Users,
      value: "2000+",
      label: "Happy Clients",
      description: "Satisfied customers and counting"
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
      description: "In the real estate industry"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Satisfaction Rate",
      description: "Client satisfaction and trust"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in building lasting relationships through honesty and clear communication in every transaction."
    },
    {
      icon: Heart,
      title: "Client First",
      description: "Your dreams and aspirations are our priority. We're committed to making your real estate journey smooth and successful."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every property we list, every client we serve, and every deal we close."
    },
    {
      icon: Building2,
      title: "Innovation",
      description: "Embracing modern technology and innovative solutions to provide you with the best real estate experience."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              About AHDC Real Estate
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your Trusted Partner in Finding Your Dream Property
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card shadow-card animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To provide exceptional real estate services that help individuals and families find their perfect homes, 
                investment properties, and land. We are committed to delivering transparent, reliable, and personalized 
                solutions that exceed our clients' expectations while maintaining the highest standards of professionalism 
                and integrity in every transaction.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card shadow-card animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-8 w-8 text-accent" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To become the most trusted and respected real estate company in the region, known for our unwavering 
                commitment to client satisfaction, innovative solutions, and ethical business practices. We envision a 
                future where every property transaction is seamless, transparent, and brings joy to our clients' lives.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak for our dedication and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="glass-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 text-center animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-lg font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16 bg-background">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index} 
                className="glass-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card shadow-card animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">About Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg font-semibold text-foreground leading-relaxed text-center">
                We are an all-purpose community housing provider.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                We are a passionate collective of community workers committed to making housing a human right—not a privilege. 
                Rooted in the belief that every family deserves a safe, dignified, and affordable place to call home, our mission 
                is to transform lives through inclusive development and sustainable housing solutions.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                We work hand-in-hand with local stakeholders to design and deliver housing that reflects the aspirations of the 
                people it serves. Whether it's through policy advocacy, grassroots mobilization, or innovative construction models, 
                we strive to bridge the gap between need and opportunity.
              </p>
              <p className="text-base leading-relaxed text-foreground font-semibold text-center pt-4 border-t">
                Together, we're not just building homes—we're nurturing hope, unity, and a future where no one is left behind.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass-strong bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground shadow-card animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let our experienced team help you find the perfect property that meets your needs and exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/properties")}
                className="bg-primary-foreground text-primary hover:scale-105 transition-transform"
              >
                Browse Properties
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contact")}
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;

