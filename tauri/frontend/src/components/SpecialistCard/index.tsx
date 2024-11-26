import {Button, Card, CardBody, CardImg, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Specialist} from "modules/types.ts";

interface SpecialistCardProps {
    specialist: T_Specialist,
    isMock: boolean
}

const SpecialistCard = ({specialist, isMock}: SpecialistCardProps) => {
    return (
        <Card key={specialist.id} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : specialist.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {specialist.name}
                </CardTitle>
                <Link to={`/specialists/${specialist.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default SpecialistCard