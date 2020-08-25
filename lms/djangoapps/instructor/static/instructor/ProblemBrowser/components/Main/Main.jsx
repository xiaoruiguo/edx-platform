/* global gettext */
import { Button, Icon } from '@edx/paragon';
import BlockBrowserContainer from 'BlockBrowser/components/BlockBrowser/BlockBrowserContainer';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ReportStatusContainer } from '../ReportStatus/ReportStatusContainer';

// function Selector(props) {
//   const { showBtn, handleToggleDropdown, selectedBlock } = props;
//   if (showBtn === 'true') {
//     return (
//       <Button
//         onClick={handleToggleDropdown}
//         label={gettext('Select a section or problem')}
//       />
//     );
//   }
//   return (
//                 // eslint-disable-next-line jsx-a11y/no-static-element-interactions
//     <span
//       onClick={handleToggleDropdown}
//       className={['problem-selector']}
//     >
//       <span>{selectedBlock || 'Select a section or problem'}</span>
//       <span className={['pull-right']}>
//         <Icon
//           className={['fa', 'fa-sort']}
//         />
//       </span>
//     </span>
//     );
// }

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.initiateReportGeneration = this.initiateReportGeneration.bind(this);
    this.state = {
      showDropdown: false,
    };
  }

  handleToggleDropdown() {
    this.props.fetchCourseBlocks(this.props.courseId, this.props.excludeBlockTypes);
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  hideDropdown() {
    this.setState({ showDropdown: false });
  }

  initiateReportGeneration() {
    this.props.createProblemResponsesReportTask(
            this.props.problemResponsesEndpoint,
            this.props.taskStatusEndpoint,
            this.props.selectedBlock,
        );
  }


  render() {
    const { selectedBlock, onSelectBlock } = this.props;
    let selectorMand = <Button onClick={this.handleToggleDropdown} label={gettext('Select a section or problem')} />;
    if (this.props.ShowBtnUi === 'false') {
      selectorMand =
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        (<span
          onClick={this.handleToggleDropdown}
          className={['problem-selector']}
        >
          <span>{selectedBlock || 'Select a section or problem'}</span>
          <span className={['pull-right']}>
            <Icon
              className={['fa', 'fa-sort']}
            />
          </span>
        </span>);
    }


    return (
      <div className="problem-browser-container">
        <div className="problem-browser">
          {selectorMand}
          <input
            type="text"
            name="problem-location"
            value={selectedBlock}
            disabled
            hidden={this.props.ShowBtnUi === 'false'}
          />
          {this.state.showDropdown &&
            <BlockBrowserContainer
              onSelectBlock={(blockId) => {
                this.hideDropdown();
                onSelectBlock(blockId);
              }}
            />}
          <Button
            onClick={this.initiateReportGeneration}
            name="list-problem-responses-csv"
            label={gettext('Create a report of problem responses')}
          />
          <ReportStatusContainer />
        </div>

      </div>
    );
  }
}

Main.propTypes = {
  courseId: PropTypes.string.isRequired,
  createProblemResponsesReportTask: PropTypes.func.isRequired,
  excludeBlockTypes: PropTypes.arrayOf(PropTypes.string),
  fetchCourseBlocks: PropTypes.func.isRequired,
  problemResponsesEndpoint: PropTypes.string.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  selectedBlock: PropTypes.string,
  taskStatusEndpoint: PropTypes.string.isRequired,
  ShowBtnUi: PropTypes.string.isRequired,
};

Main.defaultProps = {
  excludeBlockTypes: null,
  selectedBlock: '',
  timeout: null,
};
