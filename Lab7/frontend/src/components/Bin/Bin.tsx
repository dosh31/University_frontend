import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_lecture_id: string,
    specialists_count: number
}

export const Bin = ({isActive, draft_lecture_id, specialists_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="w-50" disabled>Корзина</Button>
    }

    return (
        <Link to={`/lectures/${draft_lecture_id}/`} className="w-50">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {specialists_count}
                </Badge>
            </Button>
        </Link>
    )
}