import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Specialist} from "modules/types.ts";

type Props = {
    selectedSpecialist: T_Specialist | null
}

const Breadcrumbs = ({selectedSpecialist}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/specialists") &&
                <BreadcrumbItem active>
                    <Link to="/specialists">
						Специалисты
                    </Link>
                </BreadcrumbItem>
			}
            {selectedSpecialist &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedSpecialist.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs