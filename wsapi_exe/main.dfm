object principal: Tprincipal
  Left = 0
  Top = 0
  Caption = 'Whatsapp Interceptor V.0.0.1'
  ClientHeight = 593
  ClientWidth = 649
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object PageControl1: TPageControl
    Left = 0
    Top = 0
    Width = 649
    Height = 593
    ActivePage = TabSheet1
    Align = alClient
    TabOrder = 0
    object TabSheet1: TTabSheet
      Caption = 'Home'
      DesignSize = (
        641
        565)
      object Pevent: TPanel
        Left = 0
        Top = 375
        Width = 641
        Height = 190
        Align = alBottom
        BevelOuter = bvNone
        Caption = 'Pevent'
        TabOrder = 0
        object memo1: TRichEdit
          Left = 0
          Top = 35
          Width = 641
          Height = 155
          Align = alClient
          Font.Charset = ANSI_CHARSET
          Font.Color = clBlack
          Font.Height = -13
          Font.Name = 'Consolas'
          Font.Style = []
          HideScrollBars = False
          Lines.Strings = (
            '')
          ParentFont = False
          ReadOnly = True
          ScrollBars = ssVertical
          TabOrder = 0
          Zoom = 100
          OnChange = memo1Change
        end
        object Panel1: TPanel
          Left = 0
          Top = 0
          Width = 641
          Height = 35
          Align = alTop
          Alignment = taLeftJustify
          BevelOuter = bvNone
          Caption = 'Events'
          Color = clSilver
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -16
          Font.Name = 'Consolas'
          Font.Style = [fsBold]
          ParentBackground = False
          ParentFont = False
          TabOrder = 1
          DesignSize = (
            641
            35)
          object clearLog: TButton
            Left = 514
            Top = 6
            Width = 114
            Height = 25
            Anchors = [akRight]
            Caption = 'Clear Logs'
            TabOrder = 0
            OnClick = clearLogClick
          end
        end
      end
      object Panel3: TPanel
        AlignWithMargins = True
        Left = 0
        Top = 0
        Width = 641
        Height = 119
        Margins.Left = 0
        Margins.Top = 0
        Margins.Right = 0
        Margins.Bottom = 20
        Align = alTop
        TabOrder = 1
        object Label3: TLabel
          Left = 16
          Top = 68
          Width = 90
          Height = 16
          Alignment = taRightJustify
          AutoSize = False
          Caption = 'Status .:'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Tahoma'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Label5: TLabel
          Left = 16
          Top = 86
          Width = 90
          Height = 16
          Alignment = taRightJustify
          AutoSize = False
          Caption = 'Whatsapp.:'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Tahoma'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Label7: TLabel
          Left = 16
          Top = 48
          Width = 90
          Height = 16
          Alignment = taRightJustify
          AutoSize = False
          Caption = 'Info .:'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Tahoma'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object lbStatus: TLabel
          Left = 110
          Top = 69
          Width = 87
          Height = 16
          Caption = 'Disconnected'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Tahoma'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object lbws: TLabel
          Left = 110
          Top = 86
          Width = 12
          Height = 16
          Caption = '...'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Tahoma'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object lbInfo: TLabel
          Left = 112
          Top = 50
          Width = 12
          Height = 16
          Caption = '...'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Tahoma'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Panel2: TPanel
          Left = 1
          Top = 1
          Width = 639
          Height = 32
          Align = alTop
          Alignment = taLeftJustify
          BevelEdges = []
          BevelOuter = bvNone
          Caption = 'General Status'
          Color = clSilver
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -16
          Font.Name = 'Consolas'
          Font.Style = [fsBold]
          ParentBackground = False
          ParentFont = False
          TabOrder = 0
          DesignSize = (
            639
            32)
          object resetWS: TButton
            Left = 513
            Top = 3
            Width = 117
            Height = 25
            Anchors = [akRight]
            Caption = 'WS Restar '
            TabOrder = 0
            OnClick = resetWSClick
          end
          object logOut: TButton
            Left = 402
            Top = 3
            Width = 105
            Height = 25
            Anchors = [akTop, akRight]
            Caption = 'WS Log Out'
            TabOrder = 1
            OnClick = logOutClick
          end
        end
      end
      object PCcenter: TPageControl
        AlignWithMargins = True
        Left = 0
        Top = 139
        Width = 641
        Height = 216
        Margins.Left = 0
        Margins.Top = 0
        Margins.Right = 0
        Margins.Bottom = 20
        ActivePage = TabQueue
        Align = alClient
        TabOrder = 2
        object TabQueue: TTabSheet
          Caption = 'Queue Messages'
          object DBGrid1: TDBGrid
            Left = 0
            Top = 0
            Width = 633
            Height = 188
            Align = alClient
            DataSource = DSMessagees
            ReadOnly = True
            TabOrder = 0
            TitleFont.Charset = DEFAULT_CHARSET
            TitleFont.Color = clWindowText
            TitleFont.Height = -11
            TitleFont.Name = 'Tahoma'
            TitleFont.Style = []
            OnDrawColumnCell = DBGrid1DrawColumnCell
            Columns = <
              item
                Expanded = False
                FieldName = 'intent'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'serNo'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'to'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'type'
                Width = 100
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'status'
                Width = 250
                Visible = True
              end>
          end
        end
        object TabQR: TTabSheet
          Caption = 'Whatsapp Qr Code'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -16
          Font.Name = 'Tahoma'
          Font.Style = []
          ImageIndex = 2
          ParentFont = False
          object QrPanel: TPanel
            Left = 0
            Top = 0
            Width = 633
            Height = 188
            Align = alClient
            Caption = 'QrPanel'
            TabOrder = 0
            object PaintBox1: TPaintBox
              Left = 1
              Top = 1
              Width = 631
              Height = 186
              Align = alClient
              OnPaint = PaintBox1Paint
              ExplicitLeft = 0
              ExplicitTop = 120
              ExplicitWidth = 345
              ExplicitHeight = 279
            end
          end
        end
      end
      object count: TPanel
        Left = 456
        Top = 118
        Width = 185
        Height = 44
        Anchors = [akTop, akRight]
        Caption = '0 of 0'
        Color = clDefault
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWhite
        Font.Height = -19
        Font.Name = 'Tahoma'
        Font.Style = []
        ParentBackground = False
        ParentFont = False
        TabOrder = 3
      end
    end
    object TSConfig: TTabSheet
      Margins.Left = 0
      Margins.Top = 30
      Margins.Right = 0
      Margins.Bottom = 0
      Caption = 'Config'
      ImageIndex = 2
      object configSC: TScrollBox
        Left = 0
        Top = 0
        Width = 641
        Height = 565
        Margins.Left = 0
        Margins.Top = 50
        Margins.Right = 0
        Margins.Bottom = 0
        VertScrollBar.Smooth = True
        VertScrollBar.Style = ssFlat
        VertScrollBar.Tracking = True
        Align = alClient
        TabOrder = 0
        object webhook: TPanel
          AlignWithMargins = True
          Left = 0
          Top = 142
          Width = 637
          Height = 219
          Margins.Left = 0
          Margins.Top = 0
          Margins.Right = 0
          Margins.Bottom = 10
          Align = alTop
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Consolas'
          Font.Style = []
          ParentFont = False
          TabOrder = 0
          DesignSize = (
            637
            219)
          object Panel11: TPanel
            Left = 1
            Top = 1
            Width = 635
            Height = 25
            Align = alTop
            Alignment = taLeftJustify
            BevelEdges = []
            BevelOuter = bvNone
            Caption = 'Webhook'
            Color = clSilver
            Font.Charset = DEFAULT_CHARSET
            Font.Color = clWindowText
            Font.Height = -16
            Font.Name = 'Consolas'
            Font.Style = [fsBold]
            ParentBackground = False
            ParentFont = False
            TabOrder = 0
          end
          object pushMessage: TLabeledEdit
            Left = 128
            Top = 39
            Width = 497
            Height = 23
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 91
            EditLabel.Height = 15
            EditLabel.Caption = 'SEND MESSAGES'
            LabelPosition = lpLeft
            TabOrder = 1
            Text = 'https://loscalhost:3000/api/messages'
          end
          object wsRest: TLabeledEdit
            Left = 128
            Top = 139
            Width = 497
            Height = 23
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 56
            EditLabel.Height = 15
            EditLabel.Caption = 'WS RESET'
            LabelPosition = lpLeft
            TabOrder = 2
            Text = 'HTTPS://10.0.10.80:8000'
          end
          object port: TLabeledEdit
            Left = 128
            Top = 173
            Width = 137
            Height = 23
            Color = clWhite
            EditLabel.Width = 56
            EditLabel.Height = 15
            EditLabel.Caption = 'APP PORT'
            LabelPosition = lpLeft
            TabOrder = 3
            Text = '8000'
          end
          object serverSocket: TLabeledEdit
            Left = 128
            Top = 105
            Width = 497
            Height = 23
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 91
            EditLabel.Height = 15
            EditLabel.Caption = 'SOCKET NOTYFY'
            LabelPosition = lpLeft
            TabOrder = 4
            Text = 'https://loscalhost:9697/api/messages'
          end
          object getMessage: TLabeledEdit
            Left = 128
            Top = 71
            Width = 497
            Height = 23
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 84
            EditLabel.Height = 15
            EditLabel.Caption = 'GET MESSAGES'
            LabelPosition = lpLeft
            TabOrder = 5
            Text = 'https://loscalhost:3000/api/messages'
          end
        end
        object company: TPanel
          AlignWithMargins = True
          Left = 0
          Top = 0
          Width = 637
          Height = 132
          Margins.Left = 0
          Margins.Top = 0
          Margins.Right = 0
          Margins.Bottom = 10
          Align = alTop
          TabOrder = 1
          DesignSize = (
            637
            132)
          object Panel5: TPanel
            Left = 1
            Top = 1
            Width = 635
            Height = 25
            Align = alTop
            Alignment = taLeftJustify
            BevelEdges = []
            BevelOuter = bvNone
            Caption = 'Company Info'
            Color = clSilver
            Font.Charset = DEFAULT_CHARSET
            Font.Color = clWindowText
            Font.Height = -16
            Font.Name = 'Consolas'
            Font.Style = [fsBold]
            ParentBackground = False
            ParentFont = False
            TabOrder = 0
          end
          object compName: TLabeledEdit
            Left = 80
            Top = 39
            Width = 225
            Height = 21
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 27
            EditLabel.Height = 13
            EditLabel.Caption = 'Name'
            LabelPosition = lpLeft
            TabOrder = 1
            Text = 'company name'
          end
          object compId: TLabeledEdit
            Left = 80
            Top = 69
            Width = 81
            Height = 21
            EditLabel.Width = 25
            EditLabel.Height = 13
            EditLabel.Caption = 'Code'
            LabelPosition = lpLeft
            TabOrder = 2
            Text = '1'
          end
          object sucId: TLabeledEdit
            Left = 80
            Top = 99
            Width = 81
            Height = 21
            EditLabel.Width = 45
            EditLabel.Height = 13
            EditLabel.Caption = 'Suc Code'
            LabelPosition = lpLeft
            TabOrder = 3
            Text = '1'
          end
          object showConsole: TCheckBox
            Left = 538
            Top = 32
            Width = 87
            Height = 17
            Caption = 'show console'
            TabOrder = 4
          end
        end
        object clearChats: TPanel
          AlignWithMargins = True
          Left = 0
          Top = 371
          Width = 637
          Height = 126
          Margins.Left = 0
          Margins.Top = 0
          Margins.Right = 0
          Margins.Bottom = 10
          Align = alTop
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Consolas'
          Font.Style = []
          ParentFont = False
          TabOrder = 2
          DesignSize = (
            637
            126)
          object Label1: TLabel
            Left = 288
            Top = 95
            Width = 308
            Height = 15
            Caption = 'Day of the week (0-6 for Sunday to Saturday)'
          end
          object Panel6: TPanel
            Left = 1
            Top = 1
            Width = 635
            Height = 25
            Align = alTop
            Alignment = taLeftJustify
            BevelEdges = []
            BevelOuter = bvNone
            Caption = 'Clear Chats'
            Color = clSilver
            Font.Charset = DEFAULT_CHARSET
            Font.Color = clWindowText
            Font.Height = -16
            Font.Name = 'Consolas'
            Font.Style = [fsBold]
            ParentBackground = False
            ParentFont = False
            TabOrder = 0
          end
          object hora: TLabeledEdit
            Left = 128
            Top = 58
            Width = 154
            Height = 23
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 28
            EditLabel.Height = 15
            EditLabel.Caption = 'Hour'
            LabelPosition = lpLeft
            TabOrder = 1
            Text = '02:00 am'
          end
          object active: TCheckBox
            Left = 128
            Top = 35
            Width = 177
            Height = 17
            Caption = 'delete automatic chats'
            Checked = True
            State = cbChecked
            TabOrder = 2
          end
          object clearChat: TButton
            Left = 513
            Top = 29
            Width = 120
            Height = 25
            Anchors = [akTop, akRight]
            Caption = 'Clear chat now'
            TabOrder = 3
            OnClick = clearChatClick
          end
          object semana: TLabeledEdit
            Left = 128
            Top = 87
            Width = 154
            Height = 23
            Anchors = [akLeft, akTop, akRight]
            EditLabel.Width = 28
            EditLabel.Height = 15
            EditLabel.Caption = 'Week'
            LabelPosition = lpLeft
            TabOrder = 4
            Text = '0-6'
          end
        end
        object Button1: TButton
          AlignWithMargins = True
          Left = 200
          Top = 510
          Width = 237
          Height = 32
          Margins.Left = 200
          Margins.Right = 200
          Align = alTop
          Caption = 'Save changes'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clGreen
          Font.Height = -16
          Font.Name = 'Consolas'
          Font.Style = [fsBold]
          ParentFont = False
          TabOrder = 3
          OnClick = Button1Click
          ExplicitLeft = -12
          ExplicitTop = 526
          ExplicitWidth = 637
        end
      end
    end
  end
  object DSMessagees: TDataSource
    DataSet = MSendMessage
    Left = 528
    Top = 240
  end
  object MSendMessage: TFDMemTable
    FieldDefs = <
      item
        Name = 'intent'
        DataType = ftInteger
      end
      item
        Name = 'serNo'
        DataType = ftInteger
      end
      item
        Name = 'to'
        DataType = ftString
        Size = 20
      end
      item
        Name = 'type'
        DataType = ftString
        Size = 50
      end
      item
        Name = 'status'
        DataType = ftString
        Size = 200
      end>
    IndexDefs = <>
    FetchOptions.AssignedValues = [evMode]
    FetchOptions.Mode = fmAll
    ResourceOptions.AssignedValues = [rvSilentMode]
    ResourceOptions.SilentMode = True
    UpdateOptions.AssignedValues = [uvCheckRequired, uvAutoCommitUpdates]
    UpdateOptions.CheckRequired = False
    UpdateOptions.AutoCommitUpdates = True
    StoreDefs = True
    Left = 552
    Top = 296
    object MSendMessageintent: TIntegerField
      FieldName = 'intent'
    end
    object MSendMessageserNo: TIntegerField
      FieldName = 'serNo'
    end
    object MSendMessageto: TStringField
      FieldName = 'to'
    end
    object MSendMessagetype: TStringField
      FieldName = 'type'
      Size = 50
    end
    object MSendMessagestatus: TStringField
      FieldName = 'status'
      Size = 200
    end
  end
  object Timer1: TTimer
    Enabled = False
    Interval = 200000
    OnTimer = Timer1Timer
    Left = 384
    Top = 267
  end
end
