import { Card, Container, Row, Col } from "react-bootstrap"

const contacts = [
    { icon: '\u{1F4E7}', label: 'Email', value: 'info@catstore.com' },
    { icon: '\u{1F4DE}', label: 'Phone', value: '076-611 10 000' },
    { icon: '\u{1F4CD}', label: 'Address', value: 'Cat Street 1, 123 45 Stockholm' }
]

export default function About() {
    return (
        <>
            <div className= "bg-dark text-white text-center py-4">
                <h1 className="fw-bold">About Us</h1>
            </div>

            <Container className="py-5">
                <Card className="border-0 shadow-sm mb-5 mx-auto" style={{ maxWidth: 600}}>
                    <Card.Body className="text-center p-5">
                        <div className="fs-1 mb-3">&#x1F43E;</div>
                        <h2 className="fw-bold">Philip Oxelius</h2>
                        <p className="text-muted mb-3">Founder & Cat Enthusiast</p>
                        <p>
                            Welcome to Catstore! I have been passionate about cats for over 8 years and work
                            exclusively with trusted breeders to ensure every cat is healthy, socialized, and
                            ready for a loving home.
                        </p>
                    </Card.Body>
                </Card>

                <h2 className="fw-bold text-center mb-4">Contact Us</h2>
                <Row xs={1} md={3} className="g-4">
                    {contacts.map(c => (
                        <Col key={c.label}>
                            <Card className="h-100 border-0 shadow-sm text-center p-3">
                                <Card.Body>
                                    <div className="fs-2 mb-2">{c.icon}</div>
                                    <Card.Title className="fw-bold">{c.label}</Card.Title>
                                    <Card.Text className="text-muted">{c.value}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}