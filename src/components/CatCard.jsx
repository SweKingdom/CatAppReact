import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://placehold.co/300x200?text=No+Image'

export default function CatCard({cat}) {
    const imageUrl = cat.reference_image_id
        ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
        : PLACEHOLDER;
    
    return (
        <Card className="h-100 border-0 shadow-sm">
            <Card.Img
                variant="top"
                src={imageUrl}
                alt={cat.name}
                style={{height: 180, objectFit: 'cover'}}
                onError={(e) => {e.target.src=PLACEHOLDER;}}
                loading="lazy"
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold mb-1">{cat.name}</Card.Title>
                <small className="text-muted mb-3">{cat.origin}</small>
                <Button
                    as={Link}
                    to={`/cat/${cat.id}`}
                    size="sm"
                    className="btn-catstore mt-auto"
                >View Details
                </Button>
            </Card.Body>
        </Card>
    );
}