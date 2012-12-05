using WookieService;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace Client
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class WidgetPage : Client.Common.WidgetHostPage
    {
        public WidgetPage()
        {
            this.InitializeComponent();
        }

        /// <summary>
        /// Invoked when this page needs to display a secific widget.
        /// </summary>
        /// <param name="e">Event data that describes how this page was reached.  The Parameter
        /// property will be set to the Widget we want to display.</param>
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            Widget widget = (Widget)e.Parameter;
            WidgetView.Source = new System.Uri(widget.Source);
        }
    }
}
