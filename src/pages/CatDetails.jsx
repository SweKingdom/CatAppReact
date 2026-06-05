import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBreedById } from "../services/api";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { ArrowLeft, CartPlus } from "react-bootstrap-icons";
import useCart from '../context/useCart';

const PLACEHOLDER = 'https://placehold.co/600x400?text=No+Image';

export default function CatDetails () {
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToCart, cartItems} = useCart();
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const inCart = cartItems.some(item => item.id === id);

    useEffect(() => {
        fetchBreedById(id)
            .then(data => {
                setCat(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false)
            });
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" style={{color: '#ff6600'}} />
            </div>
        );
    }

    if (error || !cat) {
        return (
            <Container className="py-5">
                <p className="text-danger">Cat not found.</p>
                <Button variant="secondary" onClick={() => navigate(-1)}>Go back</Button>
            </Container>
        );
    }

    const imageUrl = cat.reference_image_id
    ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
    : PLACEHOLDER;

    return (
        <Container className="py-5">
            <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
                <ArrowLeft className="me-1" /> Back
            </Button>

            <Row className="g-4">
                <Col md={6}>
                    <img
                        src={imageUrl}
                        alt={cat.name}
                        className="img-fluid rounded shadow-sm"
                        style={{width: '100%', height: 400, objectFit: 'cover'}}
                        onError={(e) => {e.target.src = PLACEHOLDER;}}
                    />
                </Col>

                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h1 className="fw-bold mb-2">{cat.name}</h1>
                    <p className="text-muted mb-3">Origin: {cat.origin}</p>

                    {cat.temperament && (
                        <div className="mb-3">
                            {cat.temperament.split(',').map(t=>(
                                <Badge key={t} bg="secondary" className="me-1 mb-1">{t}</Badge>
                            ))}
                        </div>
                    )}

                    <p className="mb-4">{cat.description}</p>

                    <Button
                        className={inCart ? 'btn-added' : 'btn-catstore'}
                        disabled={inCart}
                        size="lg"
                        onClick={() => addToCart(cat)}
                    >
                        <CartPlus className="me-2" />
                        {inCart ? 'Added to cart' : 'Add to cart'}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}