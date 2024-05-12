// Widget : Stat Style
// Style : Stat widget with right top icon

// import node module libraries
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { BarChart, Briefcase, DollarSign, User } from "react-feather";

const StatRightTopIcon = (props) => {
  const { info } = props;
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0">{info.title}</h4>
          </div>
          <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
            {info.id === 1 && <Briefcase size={18} />}
            {info.id === 2 && <BarChart size={18} />}
            {info.id === 3 && <DollarSign size={18} />}
            {info.id === 4 && <User size={18} />}
          </div>
        </div>
        <div>
          <h1 className="fw-bold">{info.value}</h1>
          {/* <p
            className="mb-0"
            dangerouslySetInnerHTML={{ __html: info.statInfo }}
          ></p> */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatRightTopIcon;
