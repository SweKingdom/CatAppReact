import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const features = [
    {
        icon: '\u{1F431}',
        title: 'Premium Breeds',
        text: "Browse an exclusive selection of the world's most beautiful and sought-after cat breeds."
    },

    {
        icon: '\u{2764}\u{FE0F}',
        title: 'Raised with Love',
        text: 'Every cat is raised in a loving home environment and thoroughly socialized before joining yours.'
    },

    {
        icon: '\u{1F6E1}\u{FE0F}',
        title: 'Safe Shopping',
        text: 'Shop with confidence. All purchases are backed by our satisfaction guarantee.'
    },
]

export default function Home() {
    return (
        <>
            <section className="hero-section text-white text-center">
                <Container>
                    <h1 className="display-4 fw-bold mb-3">Find Your Purrfect Match</h1>
                    <p className="lead mb-4">
                        Discover premium cat breeds from trusted breeders accros the world.
                    </p>
                    <Button as={Link} to="/cats" size="lg" className="btn-catstore">
                        Brose our cats
                    </Button>
                </Container>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <Row xs={1} md={3} className="g-4">
                        {features.map((f) => (
                            <Col key={f.title}>
                                <Card className="h-100 border-0 shadow-sm text-center p-3">
                                    <Card.Body>
                                        <div className="fs-1 mb-3">{f.icon}</div>
                                        <Card.Title className="fw-bold">{f.title}</Card.Title>
                                        <Card.Text className="text-muted">{f.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="py-5">
                <Container className="text-center">
                    <h2 className="fw-bold mb-3">Why choose Catstore?</h2>
                    <p className="text-muted mb-4 mx-auto" style={{maxWidth: 600}}>
                        We partner with only the most reputable breeders to ensure your new companion is
                        healthy, happy, and ready to become part of your family.
                    </p>
                    <Button as={Link} to="/about" variant="outline-secondary">
                        Learn more about us
                    </Button>
                </Container>
            </section>
        </>
    );
}