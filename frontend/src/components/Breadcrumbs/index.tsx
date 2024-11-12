import * as React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Specialist} from "modules/types.ts";
import {isHomePage, isSpecialistPage} from "utils/utils.ts";

interface BreadcrumbsProps {
    selectedSpecialist: T_Specialist | null
}

const Breadcrumbs = ({ selectedSpecialist }: BreadcrumbsProps) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
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
            {isSpecialistPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedSpecialist?.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs