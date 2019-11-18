import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'

const styles = theme => ({
  container: {
    width: '100%',
    minHeight: '100%',
    alignContent: 'flex-start'
  },
  header: {
    padding: '30px 0px',
    margin: '0px 60px',
    borderBottom: '1px solid '+colors.border
  },
  title: {
    color: colors.lightGray
  },
  maxHeight: {
    height: '100%',
    margin: '0px 60px',
    padding: '30px 0px'
  },
  paragraphTitle: {
    marginBottom: '16px',
  },
  paragraph: {
    marginBottom: '24px',
  }
});

class Terms extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}
      >
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h1" className={ classes.title }>CSDT Portal</Typography>
        </Grid>
        <Grid item xs={12} md={12} className={classes.maxHeight}>
          { this.renderTerms() }
        </Grid>
      </Grid>
    )
  }

  renderTerms() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h2" className={ classes.paragraphTitle }>Paragraph Title</Typography>
        <Typography className={ classes.paragraph }>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer massa nisi, commodo ut ante sollicitudin, aliquet blandit sapien. Aliquam dignissim eget lacus commodo interdum. Quisque dapibus eros quis leo interdum, id lobortis odio varius. Praesent id ex eros. Proin leo nunc, placerat non ullamcorper euismod, placerat nec felis. Phasellus porttitor suscipit justo, sit amet varius justo auctor quis. Nunc vitae malesuada ex, a varius magna. Morbi elit nunc, rutrum eget ullamcorper quis, ornare ut justo.
        </Typography>
        <Typography variant="h2"className={ classes.paragraphTitle }>Paragraph Title</Typography>
        <Typography className={ classes.paragraph }>
          Mauris blandit consectetur rutrum. Praesent nec nibh a urna pulvinar aliquam eu ac orci. Vestibulum malesuada velit vitae erat tempus, ac ornare tortor dictum. Fusce vehicula pharetra magna congue lobortis. Aenean aliquet elementum urna, nec suscipit diam porttitor ut. Nulla condimentum sem eget diam ullamcorper egestas. Donec sit amet finibus dolor. Aliquam vehicula lobortis sapien, sit amet hendrerit odio aliquam non. In vel ultricies sapien. Vestibulum et dui sed odio dapibus efficitur et id odio. Nam vitae ante sapien. Nam euismod ullamcorper ante, ut mollis dui ullamcorper sed. Donec hendrerit ut lorem eu malesuada. Quisque hendrerit velit ac tincidunt vulputate. Mauris vulputate sem quis vulputate elementum.
        </Typography>
        <Typography variant="h2"className={ classes.paragraphTitle }>Paragraph Title</Typography>
        <Typography className={ classes.paragraph }>
          Suspendisse dapibus lacus at odio elementum dictum. Sed eget dolor semper, venenatis dui at, finibus erat. Proin posuere mattis turpis, vitae dapibus leo ornare et. Quisque efficitur ante sit amet urna sodales gravida. Suspendisse aliquam, nibh id consectetur vestibulum, felis nisi vulputate erat, luctus luctus ipsum eros et odio. Maecenas vehicula bibendum ex a fringilla. In auctor dapibus massa ac tempus. Morbi sagittis convallis nunc, et accumsan augue ullamcorper sed. Pellentesque mi enim, porttitor vitae neque at, feugiat facilisis nisl. Ut sem diam, consectetur non elementum in, ullamcorper ut risus. Proin luctus, massa ut efficitur egestas, orci mauris sollicitudin felis, et volutpat nulla risus vel quam. Cras finibus, ex at ornare congue, nulla justo bibendum nibh, et auctor nisi sem sed mauris. Duis accumsan viverra consequat.

          In iaculis ex non tellus congue, id faucibus velit ultricies. Proin sem urna, finibus sit amet purus eu, dictum gravida ligula. Duis pellentesque sed orci vel pulvinar. Nunc a dolor eu tellus pellentesque rutrum sed quis ligula. Fusce quis rutrum quam. Mauris venenatis sit amet ligula quis tempor. Etiam vel consectetur massa, a congue nunc. Ut tempor sapien at turpis tincidunt, vel vehicula neque semper. Duis vehicula lectus sed pellentesque sagittis. Aenean accumsan est id porta laoreet. Fusce eu nibh eget dui tristique dictum. Aenean sit amet lacinia risus. Integer a ligula commodo, commodo lacus et, condimentum est. In vel arcu porta, rhoncus quam in, euismod lectus. Suspendisse id elementum magna.
        </Typography>
        <Typography variant="h2"className={ classes.paragraphTitle }>Paragraph Title</Typography>
        <Typography className={ classes.paragraph }>
          <ul>
            <li>Nam rhoncus ante sed sodales pharetra.</li>
            <li>Nunc consectetur urna ac nisl commodo, at iaculis elit laoreet.</li>
            <li>Phasellus at libero nec sapien varius efficitur.</li>
            <li>Ut at erat quis orci blandit tincidunt.</li>
            <li>Cras vehicula arcu at ante pellentesque, vitae vulputate nunc tempor.</li>
          </ul>
          Sed lobortis volutpat sem ac imperdiet. Donec in auctor ipsum. Vestibulum eget orci non leo finibus lobortis. Vestibulum fringilla vel ligula eget consectetur. In eget dui leo. Pellentesque pharetra felis at arcu posuere pulvinar. Nam malesuada pellentesque risus, at pharetra nibh elementum sit amet. Vestibulum et ante vitae arcu ultrices ultrices nec ac justo. Ut at tellus nec lacus gravida commodo. Nulla vehicula nibh id turpis volutpat, eget placerat ante luctus. Mauris dui erat, accumsan et elit in, molestie aliquet lacus. Duis lobortis feugiat rhoncus. Proin lacinia dui magna, a blandit tortor tristique nec. Maecenas porttitor enim a urna gravida malesuada.
        </Typography>
        <Typography variant="h2"className={ classes.paragraphTitle }>Paragraph Title</Typography>
        <Typography className={ classes.paragraph }>
          Suspendisse eget magna tortor. Pellentesque quam dui, fermentum vitae convallis aliquam, scelerisque et velit. Maecenas hendrerit maximus ante eget tincidunt. Sed mollis a dolor eget faucibus. Aenean velit enim, pulvinar quis metus quis, ornare lacinia est. Duis mattis tellus eu dui placerat egestas. Aenean eleifend urna ac sapien dictum pulvinar. Curabitur sit amet mi vel magna semper aliquet nec consectetur elit. Etiam tristique sapien arcu, ut ullamcorper eros semper ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam in auctor orci.
        </Typography>
      </React.Fragment>
    )
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(Terms)))
